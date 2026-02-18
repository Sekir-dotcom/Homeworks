interface Props {
    message: string;
    message2: number;
}

function PrintMessage({ message, message2 }: Props) {
    return (<>
        <h3> {message} </h3>
        <h3> {message2} </h3>
    </>);
}

export default PrintMessage;