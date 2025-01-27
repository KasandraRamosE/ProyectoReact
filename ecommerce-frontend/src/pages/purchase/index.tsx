import MainLayout from '@/common/components/layouts/MainLayout'
import RoundedButton from '@/common/components/ui/buttons/RoundedButton'
import {
  FormHelperText,
  Grid2 as Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

interface ClientFormType {
  fullname: string
  email: string
  deliveryAddress: {
    address: string
    number: number
  }
}

const PurchasePage = () => {
  const { control, handleSubmit } = useForm<ClientFormType>()

  handleSubmit((data) => {
    console.log(data)
  })

  const onSubmit = (data: ClientFormType) => {
    console.log(data)
    //Sending to backend...
  }

  return (
    <MainLayout title={'Purchase'}>
      <Paper
        component="form"
        variant="outlined"
        sx={{ p: 2 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <InputLabel htmlFor={'fullname'}>
              <Typography variant="subtitle1" fontWeight={'bold'} gutterBottom>
                Fullname
              </Typography>
            </InputLabel>
            <Controller
              name="fullname"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    id="fullname"
                    fullWidth
                    size="small"
                    error={!!error}
                    placeholder="Enter your fullname"
                  />
                  {!!error && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </>
              )}
              rules={{
                required: 'Fullname is required',
              }}
            />
          </Grid>

          <Grid size={{ sm: 12, md: 10 }}>
            <InputLabel htmlFor={'address'}>
              <Typography variant="subtitle1" fontWeight={'bold'} gutterBottom>
                Address
              </Typography>
            </InputLabel>
            <Controller
              name="deliveryAddress.address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="address"
                  fullWidth
                  size="small"
                  placeholder="Enter your address"
                />
              )}
            />
          </Grid>
          <Grid size={{ sm: 12, md: 2 }}>
            <InputLabel htmlFor={'numero'}>
              <Typography variant="subtitle1" fontWeight={'bold'} gutterBottom>
                Edad
              </Typography>
            </InputLabel>
            <Controller
              name="deliveryAddress.number"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    id="number"
                    fullWidth
                    size="small"
                    placeholder="Enter your age"
                  />
                  {!!error && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </>
              )}
              rules={{
                required: 'Age is required',
                min: {
                  value: 18,
                  message: 'Min age 18',
                },
                max: {
                  value: 100,
                  message: 'Max age 100',
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <InputLabel htmlFor={'email'}>
              <Typography variant="subtitle1" fontWeight={'bold'} gutterBottom>
                Email
              </Typography>
            </InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    id="email"
                    fullWidth
                    size="small"
                    placeholder="Enter your email"
                  />
                  {!!error && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </>
              )}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Is not a email',
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <RoundedButton type="submit" color="secondary">
              Purchase
            </RoundedButton>
          </Grid>
        </Grid>
      </Paper>
    </MainLayout>
  )
}

export default PurchasePage
