import React, { useEffect, useState } from 'react';
import { 
  Typography,
  Theme, 
  Paper,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputAdornment,
  InputLabel,
  FormControl,
  Snackbar,
  Alert
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { getItemDescriptions, submitFormData } from './services/services';

// @ts-ignore
// no type definitions for react-payment-inputs
import { usePaymentInputs } from 'react-payment-inputs';
import { makeStyles, createStyles } from '@mui/styles';
import { LocalizationProvider } from '@mui/lab';
import { IForm, IItem, IResponse } from './interfaces/interfaces';
  
const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      backgroundColor: '#f9f9f9',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: '90%',
      maxWidth: 720,
      padding: '2em',
    },
    formControl: {
      '&.MuiFormControl-root': {
        marginTop: '16px',
        marginBotton: '8px'
      }
    },
    buttonContainer: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'row-reverse',
    }
  })
})

const App: React.FC = () => {
  const classes = useStyles();
  const [ itemDescriptions, setItemDescriptions ] = useState<IItem[]>();
  const { meta, getCardNumberProps, getExpiryDateProps } = usePaymentInputs();
  const [ showSnackbar, setShowSnackbar ] = useState(false);

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      dob: '',
      amount: 0,
      cardNum: '',
      cardExpiry: '',
      itemDesc: ''
    }
  });

  const onSubmit = async (data: IForm) => {
    const res: IResponse = await submitFormData(data);
    if (res.success === "true") {
      setShowSnackbar(true)
    }
  }

  const populateItemDescriptions = async() => {
    const res: IItem[] = await getItemDescriptions();
    setItemDescriptions(res);
  }

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  }

  useEffect(() => {
    populateItemDescriptions();
  }, [])

  return (
    <Box className={classes.container}>
      <Paper elevation={24} className={classes.paper}>
        <Typography variant='h4'>Payment Title</Typography>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non ante magna. Nullam eu velit at ante vestibulum dignissim. Sed luctus lacinia orci eget egestas</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register("name", {
            required: true
          })} fullWidth label="Name" margin="normal" required />

          <TextField {...register("email", {
            required: true,
            pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          })} fullWidth label="Email" margin="normal" required error={errors.email ? true : false}/>

          <Controller
            name='dob'
            control={control}
            rules={{required: true}}
            render={({ field }) => 
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Date of birth"
                  value={field.value}
                  onChange={field.onChange}
                  inputFormat="MM/DD/YYYY"
                  renderInput={(params) => <TextField required fullWidth margin="normal" {...params} error={errors.dob ? true : false} />}
                />
              </LocalizationProvider>
            }
          />

          <TextField {...register("amount", {
            required: true,
            pattern: /^\d*(\.\d{0,2})?$/i,
          })} InputProps={{
            type: "number",
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }} inputProps={{step: ".01"}} fullWidth label="Amount" margin="normal" required error={errors.amount ? true : false}/>

          <Controller
            name='cardNum'
            control={control}
            rules={{
              required: true,
              validate: {
                valid: v => meta.erroredInputs.cardNumber === undefined
              }
            }}
            render={({ field }) => 
              <TextField
                fullWidth
                inputProps={getCardNumberProps({})}
                label="Credit card number"
                aria-labelledby="Credit card number"
                margin="normal" 
                required
                onChange={field.onChange}
                value={field.value}
                error={meta.touchedInputs.cardNumber && meta.erroredInputs.cardNumber ? true : false }
              />
            }
          />

          <Controller
            name='cardExpiry'
            control={control}
            rules={{
              required: true,
              validate: {
                valid: v => meta.error === undefined
              }
            }}
            render={({ field }) => 
              <TextField
                fullWidth inputProps={getExpiryDateProps({})}
                label="Credit card expiration date"
                margin="normal" 
                required
                onChange={field.onChange}
                value={field.value}
                error={meta.touchedInputs.expiryDate && meta.erroredInputs.expiryDate ? true : false }
              />
            }
          />
          
          <Controller
            name="itemDesc"
            control={control}
            rules={{
              required: true
            }}
            render={({ field }) => 
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="item-description-label">Item Description *</InputLabel>
                <Select
                  {...register("itemDesc", {
                    required: true
                  })}
                  labelId="item-description-label"
                  id="item-description"
                  value={field.value}
                  label="Item Description"
                  fullWidth
                  required
                >
                  {itemDescriptions && itemDescriptions.map((item) => {
                    return (
                      <MenuItem key={item.title} value={item.title}>{item.title}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            }
          />

          <Box className={classes.buttonContainer}>
            <Button size="large" variant="contained" type="submit">Submit</Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }} variant="filled">
          Payment sent!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default App;
