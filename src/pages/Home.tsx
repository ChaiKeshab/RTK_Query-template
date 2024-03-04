import {
    useGetAllPokemonQuery,
    useGetSpecificPokemonQuery
} from "../redux/slices/api/pokemonApiSlice"

const Home = () => {

    const { data: allPokemon } = useGetAllPokemonQuery({ offset: 20 })

    const names = allPokemon?.results.map(val => val.name) || []

    // Conditional api call
    const { data: specificPokemon } = useGetSpecificPokemonQuery(names[0] ?? null, {
        skip: names[0] ? false : true
    })

    console.log(allPokemon)
    return (
        <div>
            <div>Home</div>
            <pre>{JSON.stringify(specificPokemon, null, 2)}</pre>
        </div>
    )
}

export default Home