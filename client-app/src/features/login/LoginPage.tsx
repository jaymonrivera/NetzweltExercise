
 
import { ErrorMessage, Form, Formik } from "formik"
import { Button, Grid, GridColumn, Label } from "semantic-ui-react"
import * as Yup from 'yup'
import CommonTextInput from "../../app/common/CommonTextInput"
import { useStore } from "../../app/stores/store"


export default function LoginForm() {
    const { userStore } = useStore();
    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    })


    return (

        <Grid columns={12} stackable centered >
            <GridColumn width='6'>
                <Formik validationSchema={validationSchema} initialValues={{ username: '', password: '', error: null }} key='test'

                    onSubmit={(values: any, { setErrors }) => userStore.login(values).catch((error) => setErrors({ error: 'Invalid username or password' }))}>

                    {({ handleSubmit, isSubmitting, errors }) => (

                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <ErrorMessage name='error' render={() => <Label color='red' content='Invalid username or password' className='error-message'  ></Label>}>
                            </ErrorMessage>
                            <CommonTextInput placeholder='Email' name='username' />
                            <CommonTextInput placeholder='Password' name='password' type='password' ></CommonTextInput>
                           

                            <Button loading={isSubmitting} positive type='submit' content='Login' fluid />
                        </Form>

                    )}
                </Formik>
            </GridColumn>
            
         </Grid>
        
    
    )
}