import { useState } from "react";

function Meses() {
    const [num, setNum] = useState(0);

    return (
        <>
            <div>
                <p>Numero: {num}</p>
                <button onClick={() => setNum((num) => num + 1)}>Me atualize</button>
            </div>
        </>
    )
}

export default Meses;