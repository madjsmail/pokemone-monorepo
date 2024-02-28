
'use client'
import { useCallback, useEffect, useState } from 'react';
import styles from './page.module.css';
import type {Pokemon  } from "@nx-pokemone/shared-types";

export default function Index() {

  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    console.log('use effect')
    fetch(`http://localhost:3001/search?q=${search}`)
    .then((res) => res.json())
    .then((data) => setPokemon(data));

  },[search])

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    []
  );
  return (
    <div >
    <input value={search} onChange={onSetSearch} />

    {/* {JSON.stringify(pokemon)} */}
    <ul>
      {pokemon.map(({ id, name: { english } }) => (
        <li key={id}>{english}</li>
      ))}
    </ul>

  </div>
  )
}
