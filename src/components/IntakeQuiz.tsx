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
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';

// ─── Update this URL to your Calendly booking link ───────────────
const CALENDLY_URL = 'https://calendly.com/YOUR_LINK_HERE';

interface Answers {
  goal?: string;
  activityLevel?: string;
  limitations?: string;
  equipment?: string;
  challenge?: string;
}

const STEPS = [
  {
    key: 'goal' as const,
    question: "What's your primary goal?",
    subtitle: 'Choose the one that resonates most right now.',
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
    key: 'activityLevel' as const,
    question: 'How active are you currently?',
    subtitle: 'Be honest — there are no wrong answers.',
    options: [
      { label: 'Just getting started', emoji: '🌱' },
      { label: 'Occasionally active (1–2×/week)', emoji: '🚶' },
      { label: 'Consistently training (3–4×/week)', emoji: '🏃' },
      { label: 'Competitive athlete', emoji: '🥇' },
    ],
  },
  {
    key: 'limitations' as const,
    question: 'Any current injuries or physical limitations?',
    subtitle: "This helps Ryan design a program that's safe and effective for you.",
    options: [
      { label: 'No current limitations', emoji: '✅' },
      { label: 'Minor aches and pains', emoji: '⚠️' },
      { label: 'Managing an existing injury', emoji: '🩺' },
      { label: 'Recovering from surgery', emoji: '🏥' },
    ],
  },
  {
    key: 'equipment' as const,
    question: 'Where do you typically train?',
    subtitle: 'Programs are designed around your available equipment.',
    options: [
      { label: 'Home with minimal equipment', emoji: '🏠' },
      { label: 'Home gym setup', emoji: '🔧' },
      { label: 'Commercial gym', emoji: '🏋️' },
      { label: 'Multiple environments', emoji: '🔄' },
    ],
  },
  {
    key: 'challenge' as const,
    question: "What's your biggest obstacle right now?",
    subtitle: "Understanding this helps Ryan focus on what matters most to you.",
    options: [
      { label: "Not knowing where to start", emoji: '🗺️' },
      { label: 'Staying consistent', emoji: '📅' },
      { label: 'Past injuries holding me back', emoji: '🛡️' },
      { label: 'Not seeing results', emoji: '📊' },
    ],
  },
];

function getResultMessage(answers: Answers): { headline: string; body: string } {
  const { goal, limitations } = answers;

  if (
    limitations === 'Recovering from surgery' ||
    limitations === 'Managing an existing injury'
  ) {
    return {
      headline: "Ryan's expertise is built for exactly this.",
      body: "Your combination of fitness goals and injury history is exactly where Ryan's dual background as a Doctor of Physical Therapy and certified strength coach shines. He's helped countless clients navigate this path — and he can help you do the same.",
    };
  }

  if (goal === 'Golf Performance') {
    return {
      headline: 'TPI-certified coaching for golfers.',
      body: "As a TPI-certified coach and physical therapist, Ryan builds programs tailored to the specific demands of golf — improving rotation, mobility, and strength so you can play longer, hit farther, and stay injury-free.",
    };
  }

  if (goal === 'Athletic Performance' || goal === 'Build Strength & Muscle') {
    return {
      headline: 'Performance coaching backed by science.',
      body: "Your goals align perfectly with Ryan's approach — evidence-based programming, progressive overload, and the movement expertise of a physical therapist to keep you training hard and healthy.",
    };
  }

  if (goal === 'Return from Injury') {
    return {
      headline: 'Bridge the gap between rehab and fitness.',
      body: "For 12+ years, Ryan has specialized in guiding people from injury recovery back to the activities they love. His unique PT and coaching background means every program is built with both performance and safety in mind.",
    };
  }

  return {
    headline: "Sounds like a great fit.",
    body: "Based on your goals and background, Ryan's individualized coaching program is designed for someone exactly like you. Every plan is built around your unique situation, schedule, and equipment — no cookie-cutter plans.",
  };
}

function QuizContent() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<number | 'result'>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStep(0);
      setAnswers({});
      setSelected(null);
    };
    document.addEventListener('open-quiz', handler);
    return () => document.removeEventListener('open-quiz', handler);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(0);
      setAnswers({});
      setSelected(null);
    }, 300);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (!selected) return;
    const currentStep = STEPS[step as number];
    const newAnswers = { ...answers, [currentStep.key]: selected };
    setAnswers(newAnswers);

    setTransitioning(true);
    setTimeout(() => {
      if ((step as number) < STEPS.length - 1) {
        setStep((step as number) + 1);
        setSelected(null);
      } else {
        setStep('result');
      }
      setTransitioning(false);
    }, 200);
  };

  const handleBack = () => {
    if (step === 'result') {
      setStep(STEPS.length - 1);
      setSelected(answers[STEPS[STEPS.length - 1].key] ?? null);
    } else if ((step as number) > 0) {
      const prevStep = (step as number) - 1;
      setStep(prevStep);
      setSelected(answers[STEPS[prevStep].key] ?? null);
    }
  };

  const isResult = step === 'result';
  const currentStepIndex = isResult ? STEPS.length : (step as number);
  const progress = (currentStepIndex / STEPS.length) * 100;
  const result = isResult ? getResultMessage(answers) : null;
  const currentStep = !isResult ? STEPS[step as number] : null;

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
          maxHeight: { sm: '90vh' },
        },
      }}
    >
      {/* Header */}
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
          {(step as number) > 0 && !isResult && (
            <IconButton
              onClick={handleBack}
              size="small"
              sx={{ color: 'rgba(255,255,255,0.6)', mr: 0.5 }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          )}
          {isResult && (
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
            {isResult ? 'Your Results' : `Step ${(step as number) + 1} of ${STEPS.length}`}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Progress bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 3,
          backgroundColor: 'rgba(28,47,62,0.15)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#C08B3E',
          },
        }}
      />

      <DialogContent sx={{ p: { xs: 3, sm: 4 }, backgroundColor: '#ffffff' }}>
        <Fade in={!transitioning} timeout={200}>
          <Box>
            {/* Question step */}
            {!isResult && currentStep && (
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
                    const isSelected = selected === option.label;
                    return (
                      <Box
                        key={option.label}
                        onClick={() => handleSelect(option.label)}
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
                          }}
                        >
                          {option.label}
                        </Typography>
                        {isSelected && (
                          <CheckCircleIcon
                            sx={{ ml: 'auto', color: '#C08B3E', fontSize: '1.25rem', flexShrink: 0 }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>

                <Button
                  onClick={handleNext}
                  disabled={!selected}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 3, py: 1.625, fontSize: '0.9375rem' }}
                >
                  {(step as number) < STEPS.length - 1 ? 'Continue' : 'See My Results'}
                </Button>
              </>
            )}

            {/* Result step */}
            {isResult && result && (
              <Box sx={{ textAlign: 'center' }}>
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

                <Chip
                  label="Great News"
                  sx={{
                    backgroundColor: 'rgba(192,139,62,0.1)',
                    color: '#9B6E2C',
                    fontFamily: '"Barlow", sans-serif',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    mb: 2,
                  }}
                />

                <Typography
                  sx={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.625rem', sm: '2rem' },
                    color: '#1C2F3E',
                    lineHeight: 1.15,
                    mb: 2,
                  }}
                >
                  {result.headline}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.9375rem',
                    color: '#607182',
                    lineHeight: 1.75,
                    mb: 3.5,
                    maxWidth: 460,
                    mx: 'auto',
                  }}
                >
                  {result.body}
                </Typography>

                <Box
                  sx={{
                    backgroundColor: '#F7F4EF',
                    borderRadius: 1.5,
                    p: 2.5,
                    mb: 3,
                    textAlign: 'left',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Barlow", sans-serif',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#607182',
                      mb: 1.5,
                    }}
                  >
                    Your answers
                  </Typography>
                  {STEPS.map((s) => (
                    <Box key={s.key} sx={{ display: 'flex', gap: 1, mb: 0.75 }}>
                      <Typography
                        sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8125rem', color: '#607182', flexShrink: 0 }}
                      >
                        {s.question.replace("?", ":")}
                      </Typography>
                      <Typography
                        sx={{ fontFamily: '"Barlow", sans-serif', fontWeight: 600, fontSize: '0.8125rem', color: '#1C2F3E' }}
                      >
                        {answers[s.key] ?? '—'}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  component="a"
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ py: 1.875, fontSize: '1rem', mb: 1.5 }}
                >
                  Schedule Your Free Consultation
                </Button>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.8125rem',
                    color: '#607182',
                  }}
                >
                  Free 20-minute call · No commitment required
                </Typography>
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
