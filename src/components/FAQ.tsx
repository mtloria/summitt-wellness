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

const FAQS = [
  {
    q: 'How is this different from other online fitness programs?',
    a: "Unlike generic programs, every client receives an individualized plan based on their goals, fitness level, injury history, schedule, and available equipment. Ryan's dual background as both a fitness coach and Doctor of Physical Therapy means you get performance training and movement expertise in one — helping you get stronger, move better, and stay active long-term.",
  },
  {
    q: "What's included in my coaching program?",
    a: 'Your program includes individualized workouts for every day of the week, goal setting and progress tracking, customized rehab and prehab exercises, nutrition guidance and habit coaching, exercise demonstration videos with detailed instructions for every movement, unlimited communication through the Trainerize app, and ongoing program adjustments as you progress.',
  },
  {
    q: 'Does this include in-person training sessions?',
    a: "This is a fully online coaching program delivered through the Trainerize app. All workouts, progress tracking, exercise instruction, and coaching support are provided remotely. The biggest advantage: you get structured guidance for every workout — not just the one hour you'd spend with a trainer. This leads to greater consistency and better long-term results because the program is built around your schedule and environment.",
  },
  {
    q: 'How does the Trainerize app work?',
    a: "Trainerize is your central coaching platform. You'll receive your workouts directly in the app, track completed sessions, log progress, communicate with Ryan, and access exercise videos and instructions. It makes it easy to stay accountable and know exactly what to do each day — whether you're at the gym, at home, or traveling.",
  },
  {
    q: 'What if I have a previous injury or current aches and pains?',
    a: "This is exactly where Ryan's physical therapy background makes all the difference. During your initial consultation, he'll review your injury history, movement limitations, training experience, and goals. From there, he designs a program that helps you continue progressing while addressing areas that may be limiting your performance or increasing your injury risk. Personalized rehab and prehab exercises are incorporated as needed.",
  },
  {
    q: 'How often can I communicate with my coach?',
    a: "You have unlimited communication through the Trainerize app. Whether you have questions about an exercise, need modifications, want feedback on your training, or simply need accountability, you'll have direct access to Ryan throughout your program. He's responsive and genuinely invested in your progress.",
  },
  {
    q: 'Do you provide nutrition coaching?',
    a: "Yes — nutrition guidance is included as part of your coaching program. While Ryan is not a Registered Dietitian, he helps you develop practical nutrition habits that support your goals, whether that involves improving body composition, enhancing performance, supporting recovery, or building a healthier lifestyle. For clients with complex nutritional needs, he's happy to collaborate with a qualified RD.",
  },
  {
    q: 'Do I need gym experience or equipment to get started?',
    a: "Not at all. Whether you're brand new to exercise or an experienced athlete, your program will be tailored to your current fitness level and the equipment you have available. Every exercise includes demonstration videos and clear instructions, so you'll always know exactly how to perform each movement safely and effectively.",
  },
  {
    q: 'What does coaching cost?',
    a: "Ryan's coaching program is $250/month. Rather than list pricing without context, he prefers to connect first — a free 20-minute call lets you both determine if it's the right fit before any commitment is made. Take the quiz to get started.",
  },
  {
    q: 'How do I get started?',
    a: "It starts with a short quiz to help Ryan understand your goals and background. From there, you'll schedule a free 20-minute consultation where you'll talk through your fitness history, lifestyle, schedule, and equipment. Ryan will then build your individualized program and get you set up in Trainerize — ready to train with a clear plan and real support.",
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
              Can&rsquo;t find your answer? Reach out directly — Ryan answers every message personally.
            </Typography>
            <Box
              component="a"
              href="mailto:ryan@summittwellness.com"
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
                  <AccordionDetails>{faq.a}</AccordionDetails>
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
