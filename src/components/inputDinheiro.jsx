function InputDinheiro({valorAula, handleChange}) {


    return (
        <input
        className="input-valor-aula"
        type="text" 
        id="valor_aula" 
        value={valorAula}
        onChange={handleChange}
        placeholder="R$ 0,00"
        />
    )
}

export default InputDinheiro;