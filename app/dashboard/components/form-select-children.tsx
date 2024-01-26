import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type FormSelectChildren<T> = {
    options: T[];
    name: string;
};

const FormSelectChildren: React.FC<FormSelectChildren<string>> = ({
    options,
    name,
}) => {
    return (
        <>
            <SelectTrigger>
                <SelectValue placeholder={`Select ${name}`} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="w-100">
                    {options.map((item) => {
                        if (Array.isArray(item)) {
                            return (
                                <SelectItem key={item[1]} value={item[1]}>
                                    {item[1]}
                                </SelectItem>
                            );
                        }

                        if (!Array.isArray(item)) {
                            return (
                                <SelectItem key={item[1]} value={item}>
                                    {item}
                                </SelectItem>
                            );
                        }
                    })}
                </SelectGroup>
            </SelectContent>
        </>
    );
};

export default FormSelectChildren;
