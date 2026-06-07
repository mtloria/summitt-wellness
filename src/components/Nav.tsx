import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';

interface NavProps {
  logoSrc: string;
  base?: string;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Coaching', href: '#coaching' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

function NavContent({ logoSrc, base = '' }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const openQuiz = () => {
    document.dispatchEvent(new CustomEvent('open-quiz'));
    setMobileOpen(false);
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(28, 47, 62, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}
      >
        <Container maxWidth="lg" disableGutters sx={{ px: '24px' }}>
          <Toolbar
            disableGutters
            sx={{ height: { xs: 64, md: 76 }, justifyContent: 'space-between' }}
          >
            {/* Logo */}
            <Box
              component="a"
              href={base + '/'}
              aria-label="Summitt Wellness home"
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            >
              <Box
                component="img"
                src={logoSrc}
                alt="Summitt Wellness"
                sx={{
                  height: { xs: 34, md: 42 },
                  width: 'auto',
                  filter: 'invert(1) brightness(2)',
                }}
              />
            </Box>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  sx={{
                    color: 'rgba(255,255,255,0.82)',
                    fontFamily: '"Barlow", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.8125rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    px: 2,
                    minWidth: 0,
                    '&:hover': {
                      color: '#ffffff',
                      backgroundColor: 'rgba(255,255,255,0.07)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                onClick={openQuiz}
                variant="contained"
                color="secondary"
                sx={{ ml: 2, py: 1.25, px: 3.5 }}
              >
                Get Started
              </Button>
            </Box>

            {/* Mobile Hamburger */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#ffffff' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 340,
            backgroundColor: '#1C2F3E',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box
            component="img"
            src={logoSrc}
            alt="Summitt Wellness"
            sx={{ height: 34, width: 'auto', filter: 'invert(1) brightness(2)' }}
          />
          <IconButton
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            sx={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List disablePadding sx={{ px: 2, mt: 2 }}>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(link.href)}
                sx={{
                  py: 1.75,
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 1,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontFamily: '"Barlow", sans-serif',
                    fontWeight: 600,
                    fontSize: '1.0625rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ px: 3, mt: 4 }}>
          <Button
            onClick={openQuiz}
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ py: 1.75, fontSize: '0.9375rem' }}
          >
            Take the Fit Quiz
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default function Nav(props: NavProps) {
  return (
    <ThemeProvider theme={theme}>
      <NavContent {...props} />
    </ThemeProvider>
  );
}
