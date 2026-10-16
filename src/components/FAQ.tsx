import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { CONTACT_EMAIL } from '../config';

type FAQItem = {
  q: string;
  a: string | string[];
  intro?: string;
  // Render an array answer as paragraphs instead of a bulleted list
  paragraphs?: boolean;
};

const FAQS: FAQItem[] = [
  {
    q: 'Are you accepting new patients?',
    a: 'Yes! Use the Book Now button and select “Physical Therapy Evaluation” to schedule your first visit.',
  },
  {
    q: 'Do you accept insurance?',
    a: [
      "Summitt Wellness is not contracted with any insurance companies, which means we're considered “out of network.” Payment is made directly at the time of your visit.",
      "If you'd like to seek reimbursement, we can provide you with a superbill — a detailed receipt with the diagnosis and treatment codes your insurance company needs. You can submit it to your insurer for possible out-of-network reimbursement, though reimbursement is not guaranteed. We recommend calling your insurance company ahead of time to ask about your out-of-network physical therapy benefits.",
      "Please be advised that Summitt Wellness currently has “no relationship” with Medicare. As such, we are unable to bill for skilled physical therapy services.",
    ],
    paragraphs: true,
  },
  {
    q: 'Why doesn\'t Ryan work through insurance?',
    a: "Working outside of insurance allows for transparent pricing and care that isn't limited by insurance restrictions on visit counts, session length, or treatment choices. It also means truly one-on-one care: you'll never share a session with another patient, and you'll never be handed off to another therapist or an assistant. You work with Ryan from your first visit to your last, and quality and continuity of care come first.",
  },
  {
    q: 'Can I use my HSA or FSA for payment?',
    a: 'Yes! HSA and FSA cards are accepted.',
  },
  {
    q: "Do I need a physician's referral?",
    a: "Not necessarily. Indiana allows direct access to physical therapy services without a referral for up to 42 days. If you need care beyond 42 days, you'll need to obtain a referral at that time.",
  },
  {
    q: 'What should I expect at my initial evaluation?',
    a: "Ryan will assess your movement patterns along with your general mobility and strength, so wear comfortable clothing you can move easily in. You'll discuss your personal goals and develop a plan of care to help you reach them. Manual therapy techniques may be used or discussed to help decrease pain or improve mobility. Finally, you'll be given a home exercise program specific to you and your condition. You are an active participant in your success!",
  },
  {
    q: 'What is dry needling?',
    a: "Dry needling uses thin, sterile, single-use needles to target trigger points and tight bands of muscle. It can help decrease pain, reduce muscle tension, and improve movement. It's always used as one part of a broader treatment plan alongside manual therapy and exercise, and Ryan will talk through whether it's a good fit for you before using it.",
  },
  {
    q: 'What is cupping?',
    a: "Cupping uses suction cups placed on the skin to gently lift and decompress the underlying soft tissue. It can help ease muscle tension, reduce pain, and improve mobility. Like dry needling, it's used as one part of your treatment alongside other manual therapy and exercise when Ryan feels it will help.",
  },
  {
    q: 'How do I schedule?',
    a: 'Scheduling is easy! Click the Book Now button and schedule yourself. If you\'re a new patient, choose the location that works best for you, then select “Physical Therapy Evaluation.”',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Cancellations made more than 24 hours in advance are not charged. Cancellations within 24 hours of your appointment are charged the full session amount.',
  },
];

function FAQContent() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      component="section"
      id="faq"
      sx={{ backgroundColor: '#F7F4EF', py: { xs: 9, md: 12.5 } }}
    >
      <Container maxWidth="lg" sx={{ px: '24px' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 2fr' }, gap: { xs: 5, md: 8 } }}>
          {/* Sidebar */}
          <Box>
            <Typography
              sx={{
                fontFamily: '"Barlow", sans-serif',
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C08B3E',
                mb: 1.75,
              }}
            >
              FAQ
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Barlow Condensed", sans-serif',
                fontWeight: 800,
                fontSize: { xs: '2.25rem', md: '2.875rem' },
                lineHeight: 1.07,
                letterSpacing: '-0.01em',
                color: '#1C2F3E',
                mb: 2.5,
              }}
            >
              Common Questions.
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.9375rem',
                lineHeight: 1.75,
                color: '#607182',
                mb: 4,
              }}
            >
              Can&rsquo;t find your answer? Reach out directly. Ryan answers every message personally.
            </Typography>
            <Box
              component="a"
              href={`mailto:${CONTACT_EMAIL}`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                fontFamily: '"Barlow", sans-serif',
                fontWeight: 600,
                fontSize: '0.8125rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#1C2F3E',
                textDecoration: 'none',
                borderBottom: '2px solid #C08B3E',
                paddingBottom: '2px',
                transition: 'color 0.2s',
                '&:hover': { color: '#C08B3E' },
              }}
            >
              Ask Ryan directly
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </Box>
          </Box>

          {/* Accordion */}
          <Box>
            {FAQS.map((faq, i) => {
              const panel = `panel-${i}`;
              return (
                <Accordion
                  key={panel}
                  expanded={expanded === panel}
                  onChange={handleChange(panel)}
                  sx={{ mb: 1.5 }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon sx={{ color: '#C08B3E', fontSize: '1.375rem' }} />
                    }
                  >
                    {faq.q}
                  </AccordionSummary>
                  <AccordionDetails>
                    {Array.isArray(faq.a) && faq.paragraphs ? (
                      <Box sx={{ '& p + p': { mt: 1.5 } }}>
                        {faq.a.map((para) => (
                          <p key={para}>{para}</p>
                        ))}
                      </Box>
                    ) : Array.isArray(faq.a) ? (
                      <Box>
                        {faq.intro && (
                          <Box sx={{ mb: 1.5 }}>{faq.intro}</Box>
                        )}
                        <Box
                          component="ul"
                          sx={{ m: 0, pl: 2.5, '& li': { mb: 0.75 } }}
                        >
                          {(faq.a as string[]).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </Box>
                      </Box>
                    ) : (
                      faq.a
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default function FAQ() {
  return (
    <ThemeProvider theme={theme}>
      <FAQContent />
    </ThemeProvider>
  );
}
