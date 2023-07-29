
 
import { ErrorMessage, Form, Formik } from "formik"
import { Button, Label } from "semantic-ui-react"
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

        <Formik validationSchema={validationSchema} initialValues={{ username: '', password: '',error:null }}
            onSubmit={(values: any, { setErrors }) => userStore.login(values).catch((error) => setErrors({error: 'Invalid username or password'}))}>
    
            {({handleSubmit, isSubmitting, errors}) =>(

                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                 
                        <CommonTextInput placeholder='Email' name='username'/>
                        <CommonTextInput placeholder='Password' name='password' type='password' ></CommonTextInput>
                    <ErrorMessage name='error' render={() => <Label color='red' content='Invalid username or password'  ></Label>}>
                    </ErrorMessage>
                   
                    <Button loading={ isSubmitting} positive type='submit' content='Login' fluid />
                </Form>

            )}
        </Formik>
    
    )
}