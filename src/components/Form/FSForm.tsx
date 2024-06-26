import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";

type TConfig = {
    resolver?: any;
    defaultValues?: Record<string, any>;
    disableReset?: boolean;
};

type TProps = {
    children: React.ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
} & TConfig;

const FSForm = ({
    children,
    onSubmit,
    resolver,
    defaultValues,
    disableReset,
}: TProps) => {
    const formConfig: TConfig = {};

    if (resolver) {
        formConfig["resolver"] = resolver;
    }

    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues;
    }

    const methods = useForm(formConfig);
    const { handleSubmit, reset } = methods;

    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
        if (!disableReset) {
            reset();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)}>{children}</form>
        </FormProvider>
    );
};

export default FSForm;
