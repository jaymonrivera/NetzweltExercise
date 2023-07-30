import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}


export default function CommonTextInput(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error} >
            <Label>{props.label}</Label>
            <input {...field} {...props}  />
            {meta.touched && meta.error ? (
                <label color='red' style={{ marginLeft: '0.5em', marginTop: '0.5em' }}>{meta.error}</label>
              
            ) : null}
        </Form.Field>
    )

}