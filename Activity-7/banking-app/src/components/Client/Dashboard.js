import React, {useState, useEffect} from 'react'

const Dashboard = () => {
    const [characters, setCharacters] = useState('')

    useEffect(() => {
        fetch('https://www.breakingbadapi.com/api/characters')
        .then(res => {
            return res.json()
        })
        .then(data => {
            setCharacters(data.slice(0,10))
        })
    })

    return (
        <div>
            Client Dashboard
            {   characters &&
                characters.map(character => {
                return (
                    <div key={character.char_id}>
                        <div>{character.name} </div>
                        <div>{character.nickname} </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Dashboard
