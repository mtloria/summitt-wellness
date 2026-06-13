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

type FAQItem = {
  q: string;
  a: string | string[];
  intro?: string;
};

const FAQS: FAQItem[] = [
  {
    q: 'How is this different from other online fitness programs?',
    a: "Unlike generic workout programs, every client receives an individualized training plan based on their goals, fitness level, injury history, schedule, and available equipment. As both a fitness coach and physical therapist, I combine performance training with movement and injury expertise to help you get stronger, move better, and stay active long-term.",
  },
  {
    q: "What's included in my coaching program?",
    intro: "Your coaching program includes:",
    a: [
      'Individualized workouts for every day of the week',
      'Goal setting and progress tracking',
      'Customized rehab and prehab exercises based on your initial consultation',
      'Nutrition guidance and habit coaching',
      'Exercise demonstration videos and detailed instructions for every movement',
      'Unlimited communication and support through the Trainerize app',
      'Ongoing program adjustments based on your progress and feedback',
    ],
  },
  {
    q: 'Does this include in-person training sessions?',
    a: "This is a fully online coaching program delivered through the Trainerize app. While we will connect during your initial consultation and communicate regularly throughout the coaching process, all workouts, progress tracking, exercise instruction, and coaching support are provided remotely. One of the biggest advantages of online coaching is that it provides guidance for every workout, not just the one hour you spend with a trainer. This leads to greater consistency and better long-term results because the program is built around your schedule and actual environment.",
  },
  {
    q: 'How does the Trainerize app work?',
    a: "Trainerize serves as your central coaching platform. You'll receive your workouts directly in the app, track completed sessions, log progress, communicate directly with your coach, and access exercise videos and instructions. The app makes it easy to stay accountable and know exactly what to do each day.",
  },
  {
    q: 'What if I have a previous injury or current aches and pains?',
    a: "During our initial consultation, we'll review your injury history, movement limitations, training experience, and goals. Using that information, I'll design a program that helps you continue progressing while addressing areas that may be limiting your performance or increasing your risk of injury. Personalized rehab and prehab exercises will be incorporated as needed to help you move and perform at your best.",
  },
  {
    q: 'How often can I communicate with my coach?',
    a: "You have unlimited communication through the Trainerize app. Whether you have questions about an exercise, need modifications, want feedback on your training, or simply need accountability, you'll have direct access to coaching support throughout your program.",
  },
  {
    q: 'Do you provide nutrition coaching?',
    a: "Yes. Nutrition guidance is included as part of your coaching program. While I am not a Registered Dietitian, I can help you develop practical nutrition habits that support your goals, whether that involves improving body composition, enhancing performance, supporting recovery, or building a healthier lifestyle. For clients with more complex nutritional needs, I'm happy to collaborate with a qualified RD.",
  },
  {
    q: 'Can the program be customized for my specific sport or goal?',
    a: "Absolutely. Every program is built around your individual goals. Whether your focus is building strength, improving body composition, enhancing athletic performance, returning from injury, improving golf performance, preparing for a specific event, or simply living a healthier, more active lifestyle, your program will evolve as you progress.",
  },
  {
    q: 'Do I need gym experience or equipment to get started?',
    a: "Not at all. Whether you're new to exercise or an experienced athlete, your program will be tailored to your current fitness level. Every exercise includes demonstration videos and clear instructions, so you'll always know exactly how to perform each movement safely and effectively.",
  },
  {
    q: 'What does coaching cost?',
    a: "Coaching is personalized to each client, and pricing is something we discuss during the initial consultation. The goal is to get to know you first, understand your situation, and make sure the program is the right fit before anything else. Take the quiz to start the conversation.",
  },
  {
    q: 'How do I get started?',
    a: "The process begins with an initial consultation where we'll discuss your goals, training history, injury history, lifestyle, schedule, and available equipment. From there, I'll build your individualized program and get you set up in Trainerize so you can begin training with confidence and a clear plan for success.",
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
              href="mailto:Ryan@summittwellness.com"
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
                    {Array.isArray(faq.a) ? (
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
