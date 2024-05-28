import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

type TProps = {
    onReset?: () => void;
};

const FSResetButton = ({ onReset = () => {} }: TProps) => {
    const { reset } = useFormContext();

    return (
        <Button
            variant="outlined"
            sx={{
                textTransform: "capitalize",
                marginTop: 2,
            }}
            onClick={() => {
                reset();
                onReset();
            }}
        >
            Clear All
        </Button>
    );
};

export default FSResetButton;
