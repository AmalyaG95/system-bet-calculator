type TSetNumber = React.Dispatch<React.SetStateAction<number>>;
type TSetBoolean = React.Dispatch<React.SetStateAction<boolean>>;
type TSetString = React.Dispatch<React.SetStateAction<string>>;

type TSetNumberOrNull = Dispatch<SetStateAction<number | null>>;
type TSetStringOrNull = Dispatch<SetStateAction<string | null>>;

type TMouseEvent = MouseEvent<HTMLButtonElement, MouseEvent>;
type TChangeEvent = React.ChangeEvent<HTMLInputElement>;
type TSetGlobalState = Dispatch<SetStateAction<State>>;