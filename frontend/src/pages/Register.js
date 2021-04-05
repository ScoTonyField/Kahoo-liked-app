import React from 'react';
import { Container, Grid, Button, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    cursor: 'pointer',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  toptext: {
    textAlign: 'center',
  },
});

class Register extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      pwd: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target,
    });
  };

  handleSubmit = (event) => {
    event.prreventDefault();
    const post = {
      email: this.state.email,
      password: this.state.pwd,
      name: this.state.name,
    };
    console.log(post);
    // fetch('http://localhost:5005/admin/auth/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(post),
    // }).then(res => {
    //   return res.json();
    // }).then(data => {
    //   console.log(data);
    // }).catch(err => {
    //   alert(err);
    // })
  }

  render () {
    // const { name, password, email } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.paper}>
        <Container component='main' maxWidth='xs'>
          <Typography component='h1' variant='h5' className={classes.toptext}>
            Join BigBrain
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="sinupName"
                  variant="outlined"
                  required
                  fullWidth
                  id="signup-name"
                  label="Username"
                  // autoFocus
                  defaultValue={this.state.name}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    name="signupPwd"
                    variant="outlined"
                    required
                    fullWidth
                    id="signup-pwd"
                    label="Password"
                    type='password'
                    // autoFocus
                    defaultValue={this.state.pwd}
                    onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="signup-email"
                  autoComplete="email"
                  defaultValue={this.state.email}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
