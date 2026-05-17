'use client';
import { useActionState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { adminLogin } from './actions';
import { BRAND } from '@/lib/brand';

export function LoginForm() {
  const [state, action, pending] = useActionState(adminLogin, null);

  return (
    <Box
      component="form"
      action={action}
      sx={{ border: '2px solid #333', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        name="password"
        type="password"
        label="סיסמת אדמין"
        required
        fullWidth
        autoFocus
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#1a1a1a',
            color: '#fff',
            '& fieldset': { borderColor: '#333' },
            '&:hover fieldset': { borderColor: '#555' },
          },
          '& .MuiInputLabel-root': { color: '#666' },
        }}
      />

      {state?.error && (
        <Typography sx={{ color: '#ff6b6b', fontFamily: 'monospace', fontSize: 12 }}>
          {state.error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={pending}
        fullWidth
        sx={{ bgcolor: BRAND.green, color: '#fff', fontWeight: 700, borderRadius: 0, '&:hover': { bgcolor: BRAND.greenDark } }}
      >
        {pending ? '...' : 'כניסה'}
      </Button>
    </Box>
  );
}
