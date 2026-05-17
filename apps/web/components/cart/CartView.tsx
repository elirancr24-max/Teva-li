'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  clearCart,
  decrementAmount,
  incrementAmount,
  removeItem,
} from '@/store/slices/cartSlice';
import { BRAND } from '@/lib/brand';

const UNIT_LABEL: Record<string, string> = {
  kg: 'ק״ג',
  unit: 'יח׳',
  bunch: 'צרור',
};

export function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.priceCents * i.amount, 0),
    [items],
  );

  const formatPrice = (cents: number) => `₪${(cents / 100).toFixed(2)}`;

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4, minHeight: '60vh' }}>
        <Typography variant="h1" sx={{ fontSize: 32, fontWeight: 800, mb: 3 }}>
          הסל שלי
        </Typography>

        {items.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 64, opacity: 0.4, mb: 2 }} />
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>הסל ריק</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              התחילו להוסיף מוצרים לקטלוג
            </Typography>
            <Button component={Link} href="/shop" variant="contained" size="large">
              לקטלוג המוצרים
            </Button>
          </Paper>
        ) : (
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Paper sx={{ flex: 1, p: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>מוצר</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      כמות
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="left">
                      סה״כ
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600 }}>{item.product.name}</Typography>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                          {formatPrice(item.product.priceCents)} / {(item.product.weight && item.product.weight.trim()) || UNIT_LABEL[item.product.unit] || ''}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => dispatch(decrementAmount(item.productId))}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ minWidth: 60, textAlign: 'center', fontWeight: 600 }}>
                            {item.amount} {UNIT_LABEL[item.product.unit]}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => dispatch(incrementAmount(item.productId))}
                            sx={{ bgcolor: BRAND.green, color: '#fff', '&:hover': { bgcolor: BRAND.greenDark } }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell align="left" sx={{ fontWeight: 700, color: BRAND.green }}>
                        {formatPrice(item.product.priceCents * item.amount)}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          size="small"
                          onClick={() => dispatch(removeItem(item.productId))}
                          sx={{ color: 'text.secondary' }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box sx={{ pt: 2, textAlign: 'left' }}>
                <Button onClick={() => dispatch(clearCart())} color="inherit" size="small">
                  ריקון הסל
                </Button>
              </Box>
            </Paper>

            <Paper sx={{ width: { md: 320 }, p: 3, height: 'fit-content' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}>סיכום</Typography>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography>סכום ביניים</Typography>
                <Typography>{formatPrice(total)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography>משלוח</Typography>
                <Typography sx={{ color: BRAND.green, fontWeight: 700 }}>חינם בדימונה</Typography>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 700 }}>סה״כ</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: BRAND.green }}>
                  {formatPrice(total)}
                </Typography>
              </Stack>
              <Button component={Link} href="/checkout" variant="contained" fullWidth size="large">
                המשך לתשלום
              </Button>
            </Paper>
          </Stack>
        )}
      </Container>
      <Footer />
    </>
  );
}
