'use client';
import { useState } from 'react';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { BRAND } from '@/lib/brand';

const FIELD_LABEL_SX = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: 10,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: BRAND.ink,
  opacity: 0.6,
  mb: 0.75,
};

const INPUT_SX = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    bgcolor: '#fff',
    fontSize: 15,
    '& fieldset': { borderColor: BRAND.ink, borderWidth: 2 },
    '&:hover fieldset': { borderColor: BRAND.green },
    '&.Mui-focused fieldset': { borderColor: BRAND.green, borderWidth: 2 },
  },
};

export function ContactForm({ whatsapp }: { whatsapp: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = whatsapp.replace(/[^0-9]/g, '');
    const text = `פנייה מאתר טבע לי\nשם: ${name}${email ? `\nאימייל: ${email}` : ''}\n\n${message}`;
    window.open(`https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        border: `2px solid ${BRAND.ink}`,
        bgcolor: BRAND.cream,
        p: { xs: 3, md: 4 },
      }}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography sx={FIELD_LABEL_SX}>שם מלא</Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            size="small"
            placeholder="דנה לוי"
            sx={INPUT_SX}
          />
        </Box>
        <Box>
          <Typography sx={FIELD_LABEL_SX}>אימייל</Typography>
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            size="small"
            placeholder="dana@example.com"
            sx={INPUT_SX}
          />
        </Box>
        <Box>
          <Typography sx={FIELD_LABEL_SX}>הודעה</Typography>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            fullWidth
            multiline
            minRows={5}
            placeholder="מה תרצו לספר לנו?"
            sx={INPUT_SX}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={<SendIcon sx={{ transform: 'scaleX(-1)' }} />}
          sx={{
            bgcolor: BRAND.ink,
            color: '#F5F0E8',
            py: 1.5,
            borderRadius: 0,
            fontWeight: 800,
            fontSize: 15,
            '&:hover': { bgcolor: BRAND.green, color: BRAND.ink },
          }}
        >
          שליחה
        </Button>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', textAlign: 'center' }}>
          הודעתכם תיפתח ב-WhatsApp לשליחה ישירה אלינו.
        </Typography>
      </Stack>
    </Box>
  );
}
