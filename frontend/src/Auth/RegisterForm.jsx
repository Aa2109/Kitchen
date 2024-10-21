import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select,TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../State/Authentication/Action'
import { useDispatch } from 'react-redux'

const initialValues={
  fullName:'',
  email:'',
  password:'',
  role:''
}

const RegisterForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = (values)=>{
    console.log("Form Values: ", values);
    dispatch(registerUser({userData:values, navigate}))
  }


  return (
    <div>
    <Typography variant='h5' className='text-center'>
    Register
    </Typography>
    
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
        <Field
                  as={TextField}
                  name="fullName"
                  label="full name"
                  fullWidth
                  variant="outlined"
                  margin='normal'
                />
        <Field
                  as={TextField}
                  name="email"
                  label="email"
                  fullWidth
                  variant="outlined"
                  margin='normal'
                />
        <Field
                  as={TextField}
                  name="password"
                  label="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  margin='normal'

                />

<FormControl fullWidth margin='normal'>
  <InputLabel id="role-simple-select-label">Role</InputLabel>
  <Field
  as={Select}
    labelId="role-simple-select-label"
    id="role-simple-select"
    name="role"
    // value={age}
    label="Role"
    // onChange={handleChange}
  >
    <MenuItem value={'ROLE_CUSTOMER'}>Customer</MenuItem>
    <MenuItem value={'ROLE_RESTAURANT_OWNER'}>Restaurant Owner</MenuItem>
  </Field>
</FormControl>

                <Button type='submit' fullWidth variant='contained' sx={{mt:2, padding:'1rem'}}>Register</Button>
        </Form>
      </Formik>
      <Typography variant='body2' align='center' sx={{mt:3}}>
        Allready have an account?
        <Button size='small' onClick={()=>navigate('/account/login')}>
          login
        </Button>
      </Typography>
   
  </div>
  )
}

export default RegisterForm