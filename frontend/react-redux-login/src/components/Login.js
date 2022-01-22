import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import authService from '../services/auth-service';
import { clearMessage } from '../slices/message-slice';

const Login = () => {

  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const initialValues = {
    email: "",
    password: ""
  }

  const formValidation = Yup.object().shape({
    email: Yup.string().required('the email is required '),
    password: Yup.string().required('the password is required')
  });


  if (isLoggedIn) {
    navigate('/tasks')
  }

  const handleSubmit =  (formData) => {
    const { email, password } = formData;
    setLoading(true);
    try {
      dispatch(authService.userLogin({email, password }))
      .unwrap()
      .then((result)=>{
        console.log('result');
        window.location.href='/tasks';
      })

      window.location.reload();

    } catch (error) {

      setTimeout(() => {
        window.location.reload();
      }, 1000);
        console.log(error);


    }


  }

  return (
    <div className="col-md-12 login-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={formValidation}
          onSubmit={handleSubmit}
        >

          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
          </Form>
        </Formik>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default Login;
