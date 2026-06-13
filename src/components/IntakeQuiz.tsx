import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  LinearProgress,
  Fade,
  TextField,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';

const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = 'bff71d1d-a864-4d22-8f6d-281e0368ca8c';

const STEPS = [
  {
    key: 'goal',
    label: 'Goals',
    multiSelect: true,
    question: "What are your goals?",
    subtitle: 'Select all that apply.',
    options: [
      { label: 'Build Strength & Muscle', emoji: '💪' },
      { label: 'Improve Body Composition', emoji: '⚡' },
      { label: 'Athletic Performance', emoji: '🏆' },
      { label: 'Return from Injury', emoji: '🔄' },
      { label: 'Golf Performance', emoji: '⛳' },
      { label: 'General Wellness & Longevity', emoji: '🌿' },
    ],
  },
  {
    key: 'activityLevel',
    label: 'Activity level',
    multiSelect: false,
    question: 'How active are you currently?',
    subtitle: 'Choose one.',
    options: [
      { label: 'Just getting started', emoji: '🌱' },
      { label: 'Occasionally active (1–2×/week)', emoji: '🚶' },
      { label: 'Consistently training (3–4×/week)', emoji: '🏃' },
      { label: 'Competitive athlete', emoji: '🥇' },
    ],
  },
  {
    key: 'limitations',
    label: 'Limitations',
    multiSelect: false,
    question: 'Any current injuries or physical limitations?',
    subtitle: 'Choose one.',
    options: [
      { label: 'No current limitations', emoji: '✅' },
      { label: 'Minor aches and pains', emoji: '⚠️' },
      { label: 'Managing an existing injury', emoji: '🩺' },
      { label: 'Recovering from surgery', emoji: '🏥' },
    ],
  },
  {
    key: 'equipment',
    label: 'Training environment',
    multiSelect: false,
    question: 'Where do you typically train?',
    subtitle: 'Choose one.',
    options: [
      { label: 'Home with minimal equipment', emoji: '🏠' },
      { label: 'Home gym setup', emoji: '🔧' },
      { label: 'Commercial gym', emoji: '🏋️' },
      { label: 'Multiple environments', emoji: '🔄' },
    ],
  },
  {
    key: 'challenge',
    label: 'Biggest challenges',
    multiSelect: true,
    question: "What are your biggest obstacles right now?",
    subtitle: 'Select all that apply.',
    options: [
      { label: "Not knowing where to start", emoji: '🗺️' },
      { label: 'Staying consistent', emoji: '📅' },
      { label: 'Past injuries holding me back', emoji: '🛡️' },
      { label: 'Not seeing results', emoji: '📊' },
    ],
  },
];

type QuizStep = number | 'contact' | 'done';

function QuizContent() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<QuizStep>(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStep(0);
      setAnswers({});
      setSelectedOptions([]);
      setEmail('');
      setMessage('');
      setSubmitError('');
    };
    document.addEventListener('open-quiz', handler);
    return () => document.removeEventListener('open-quiz', handler);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(0);
      setAnswers({});
      setSelectedOptions([]);
      setEmail('');
      setMessage('');
      setSubmitError('');
    }, 300);
  };

  const handleToggle = (option: string, multiSelect: boolean) => {
    if (multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;
    const current = STEPS[step as number];
    const newAnswers = { ...answers, [current.key]: selectedOptions };
    setAnswers(newAnswers);

    setTransitioning(true);
    setTimeout(() => {
      if ((step as number) < STEPS.length - 1) {
        const nextIdx = (step as number) + 1;
        setStep(nextIdx);
        setSelectedOptions(newAnswers[STEPS[nextIdx].key] ?? []);
      } else {
        setStep('contact');
        setSelectedOptions([]);
      }
      setTransitioning(false);
    }, 200);
  };

  const handleBack = () => {
    if (step === 'done') return;
    if (step === 'contact') {
      const prevIdx = STEPS.length - 1;
      setStep(prevIdx);
      setSelectedOptions(answers[STEPS[prevIdx].key] ?? []);
    } else if ((step as number) > 0) {
      const prevIdx = (step as number) - 1;
      setStep(prevIdx);
      setSelectedOptions(answers[STEPS[prevIdx].key] ?? []);
    }
  };

  const handleSubmit = async () => {
    if (!emailValid) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        access_key: ACCESS_KEY,
        subject: 'New Fit Quiz Submission — Summitt Wellness',
        from_name: 'Summitt Wellness',
        email: email.trim(),
        'Additional notes': message.trim() || '(none)',
        Goals: (answers['goal'] ?? []).join(', '),
        'Activity level': (answers['activityLevel'] ?? []).join(', '),
        'Injuries / limitations': (answers['limitations'] ?? []).join(', '),
        'Training environment': (answers['equipment'] ?? []).join(', '),
        'Biggest challenges': (answers['challenge'] ?? []).join(', '),
      };
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message ?? 'Submission failed');
      setStep('done');
    } catch {
      setSubmitError('Something went wrong. Please try again or email Ryan directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const isContact = step === 'contact';
  const isDone = step === 'done';
  const isQuiz = typeof step === 'number';

  // 5 quiz steps + 1 contact step = 6 total
  const totalSteps = STEPS.length + 1;
  const stepIndex = isDone ? totalSteps : isContact ? STEPS.length : (step as number);
  const progress = (stepIndex / totalSteps) * 100;

  const canGoBack = !isDone && (isContact || (step as number) > 0);
  const currentStep = isQuiz ? STEPS[step as number] : null;
  const emailValid = email.trim().length > 0 && email.includes('@');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={typeof window !== 'undefined' && window.innerWidth < 600}
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 2 },
          overflow: 'hidden',
          maxHeight: { sm: '92vh' },
        },
      }}
    >
      {/* ── Header ────────────────────────────────────────────── */}
      <Box
        sx={{
          backgroundColor: '#1C2F3E',
          px: 3,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {canGoBack && (
            <IconButton
              onClick={handleBack}
              size="small"
              sx={{ color: 'rgba(255,255,255,0.6)', mr: 0.5 }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          )}
          <Typography
            sx={{
              fontFamily: '"Barlow", sans-serif',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {isDone
              ? "You're all set"
              : isContact
              ? 'Almost there'
              : `Step ${(step as number) + 1} of ${STEPS.length}`}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ── Progress bar ──────────────────────────────────────── */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 3,
          backgroundColor: 'rgba(28,47,62,0.15)',
          '& .MuiLinearProgress-bar': { backgroundColor: '#C08B3E' },
        }}
      />

      <DialogContent sx={{ p: { xs: 3, sm: 4 }, backgroundColor: '#ffffff' }}>
        <Fade in={!transitioning} timeout={200}>
          <Box>

            {/* ── Quiz step ──────────────────────────────────── */}
            {isQuiz && currentStep && (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    color: '#1C2F3E',
                    mb: 0.75,
                    lineHeight: 1.15,
                  }}
                >
                  {currentStep.question}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.875rem',
                    color: '#607182',
                    mb: 3,
                  }}
                >
                  {currentStep.subtitle}
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 1.5,
                  }}
                >
                  {currentStep.options.map((option) => {
                    const isSelected = selectedOptions.includes(option.label);
                    return (
                      <Box
                        key={option.label}
                        onClick={() => handleToggle(option.label, currentStep.multiSelect)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 2,
                          borderRadius: 1.5,
                          border: isSelected ? '2px solid #C08B3E' : '1.5px solid #E2DDD8',
                          backgroundColor: isSelected ? 'rgba(192,139,62,0.06)' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.18s ease',
                          userSelect: 'none',
                          '&:hover': {
                            border: '2px solid #C08B3E',
                            backgroundColor: 'rgba(192,139,62,0.04)',
                          },
                        }}
                      >
                        <Box sx={{ fontSize: '1.375rem', lineHeight: 1, flexShrink: 0 }}>
                          {option.emoji}
                        </Box>
                        <Typography
                          sx={{
                            fontFamily: '"Barlow", sans-serif',
                            fontWeight: isSelected ? 600 : 500,
                            fontSize: '0.9375rem',
                            color: isSelected ? '#1C2F3E' : '#3D5060',
                            lineHeight: 1.3,
                            flex: 1,
                          }}
                        >
                          {option.label}
                        </Typography>
                        {/* Checkbox (multi) or radio (single) indicator */}
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: currentStep.multiSelect ? '4px' : '50%',
                            border: isSelected ? 'none' : '1.5px solid #C4BAB0',
                            backgroundColor: isSelected ? '#C08B3E' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {isSelected && currentStep.multiSelect && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <polyline
                                points="2,6 5,9 10,3"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {isSelected && !currentStep.multiSelect && (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: '#ffffff',
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                <Button
                  onClick={handleNext}
                  disabled={selectedOptions.length === 0}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 3, py: 1.625, fontSize: '0.9375rem' }}
                >
                  {(step as number) < STEPS.length - 1 ? 'Continue' : 'Almost Done'}
                </Button>
              </>
            )}

            {/* ── Contact form ────────────────────────────────── */}
            {isContact && (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    color: '#1C2F3E',
                    mb: 0.75,
                    lineHeight: 1.15,
                  }}
                >
                  Leave your email and Ryan will reach out personally.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && emailValid) handleSubmit();
                    }}
                    placeholder="you@example.com"
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#C08B3E' },
                      '& label.Mui-focused': { color: '#C08B3E' },
                    }}
                  />
                  <TextField
                    label="Anything else Ryan should know? (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    placeholder="Current injuries, upcoming events, specific goals, or anything else on your mind..."
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#C08B3E' },
                      '& label.Mui-focused': { color: '#C08B3E' },
                    }}
                  />
                </Box>

                {/* Answer summary */}
                <Box
                  sx={{
                    mt: 3,
                    backgroundColor: '#F7F4EF',
                    borderRadius: 1.5,
                    p: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Barlow", sans-serif',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#607182',
                      mb: 1.25,
                    }}
                  >
                    Your answers
                  </Typography>
                  {STEPS.map((s) => {
                    const selected = answers[s.key] ?? [];
                    return (
                      <Box
                        key={s.key}
                        sx={{ display: 'flex', gap: 1.5, mb: 0.75, flexWrap: 'wrap', alignItems: 'baseline' }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '0.8rem',
                            color: '#607182',
                            flexShrink: 0,
                            minWidth: 130,
                          }}
                        >
                          {s.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Barlow", sans-serif',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            color: '#1C2F3E',
                          }}
                        >
                          {selected.length > 0 ? selected.join(', ') : '—'}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                {submitError && (
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.875rem',
                      color: '#c0392b',
                      mt: 2,
                    }}
                  >
                    {submitError}
                  </Typography>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={!emailValid || submitting}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 3, py: 1.625, fontSize: '0.9375rem' }}
                >
                  {submitting ? (
                    <CircularProgress size={22} sx={{ color: '#fff' }} />
                  ) : (
                    'Send to Ryan'
                  )}
                </Button>
              </>
            )}

            {/* ── Confirmation ────────────────────────────────── */}
            {isDone && (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(192,139,62,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <CheckCircleIcon sx={{ color: '#C08B3E', fontSize: '2rem' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.875rem', sm: '2.25rem' },
                    color: '#1C2F3E',
                    lineHeight: 1.1,
                    mb: 2,
                  }}
                >
                  You're all set.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.9375rem',
                    color: '#607182',
                    lineHeight: 1.75,
                    maxWidth: 380,
                    mx: 'auto',
                    mb: 4,
                  }}
                >
                  Ryan will be in touch at{' '}
                  <Box component="span" sx={{ fontWeight: 600, color: '#1C2F3E' }}>
                    {email}
                  </Box>
                  .
                </Typography>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{
                    fontFamily: '"Barlow", sans-serif',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    letterSpacing: '0.06em',
                    borderColor: '#1C2F3E',
                    color: '#1C2F3E',
                    px: 4,
                    '&:hover': { backgroundColor: 'rgba(28,47,62,0.05)' },
                  }}
                >
                  Close
                </Button>
              </Box>
            )}

          </Box>
        </Fade>
      </DialogContent>
    </Dialog>
  );
}

export default function IntakeQuiz() {
  return (
    <ThemeProvider theme={theme}>
      <QuizContent />
    </ThemeProvider>
  );
}
