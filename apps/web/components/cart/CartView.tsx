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
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 }, minHeight: '60vh' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 800, mb: { xs: 2, md: 3 }, textAlign: { xs: 'center', md: 'right' } }}>
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
            <Paper sx={{ flex: 1, p: { xs: 1.5, md: 2 } }}>
              {/* Desktop: table */}
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
                              aria-label={`הפחת כמות ${item.product.name}`}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ minWidth: 60, textAlign: 'center', fontWeight: 600 }}>
                              {item.amount} {UNIT_LABEL[item.product.unit]}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => dispatch(incrementAmount(item.productId))}
                              aria-label={`הוסף כמות ${item.product.name}`}
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
              </Box>

              {/* Mobile: card stack */}
              <Stack spacing={1.5} sx={{ display: { xs: 'flex', md: 'none' } }}>
                {items.map((item) => {
                  const unit = (item.product.weight && item.product.weight.trim()) || UNIT_LABEL[item.product.unit] || '';
                  return (
                    <Box
                      key={item.productId}
                      sx={{
                        border: '1px solid #eee',
                        borderRadius: 2,
                        p: 1.5,
                        display: 'flex',
                        gap: 1.25,
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 1.5,
                          bgcolor: 'grey.100',
                          backgroundImage: item.product.imageUrl ? `url(${item.product.imageUrl})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                          <Typography sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>
                            {item.product.name}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => dispatch(removeItem(item.productId))}
                            sx={{ color: 'text.secondary', p: 0.25, mt: -0.5, mr: -0.5 }}
                            aria-label="הסר"
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>
                          {formatPrice(item.product.priceCents)} / {unit}
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
                          <Stack direction="row" alignItems="center" spacing={0.75}>
                            <IconButton
                              size="small"
                              onClick={() => dispatch(decrementAmount(item.productId))}
                              aria-label={`הפחת כמות ${item.product.name}`}
                              sx={{ bgcolor: 'grey.100', width: 44, height: 44 }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ minWidth: 50, textAlign: 'center', fontWeight: 700, fontSize: 14 }}>
                              {item.amount} {unit}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => dispatch(incrementAmount(item.productId))}
                              aria-label={`הוסף כמות ${item.product.name}`}
                              sx={{ bgcolor: BRAND.green, color: '#fff', width: 44, height: 44, '&:hover': { bgcolor: BRAND.greenDark } }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                          <Typography sx={{ fontWeight: 800, color: BRAND.green, fontSize: 16 }}>
                            {formatPrice(item.product.priceCents * item.amount)}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>

              <Box sx={{ pt: 2, textAlign: 'left' }}>
                <Button onClick={() => dispatch(clearCart())} color="inherit" size="small">
                  ריקון הסל
                </Button>
              </Box>
            </Paper>

            <Paper sx={{ width: { xs: '100%', md: 320 }, p: { xs: 2, md: 3 }, height: 'fit-content' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}>סיכום</Typography>

              {/* Free delivery progress bar */}
              {(() => {
                const FREE_DELIVERY_MIN = 15000; // ₪150 in cents
                const remaining = FREE_DELIVERY_MIN - total;
                const progress = Math.min(100, Math.round((total / FREE_DELIVERY_MIN) * 100));
                return (
                  <Box sx={{ mb: 2 }}>
                    {remaining > 0 ? (
                      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 0.75 }}>
                        עוד <Box component="span" sx={{ fontWeight: 800, color: BRAND.brown }}>{formatPrice(remaining)}</Box> למשלוח חינם
                      </Typography>
                    ) : (
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: BRAND.green, mb: 0.75 }}>
                        ✓ זכאי למשלוח חינם!
                      </Typography>
                    )}
                    <Box sx={{ width: '100%', height: 6, bgcolor: 'grey.200', borderRadius: 999, overflow: 'hidden' }}>
                      <Box sx={{ width: `${progress}%`, height: '100%', bgcolor: BRAND.green, borderRadius: 999, transition: 'width 400ms ease' }} />
                    </Box>
                  </Box>
                );
              })()}

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
