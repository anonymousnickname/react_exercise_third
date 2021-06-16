import React, {useState} from "react";
import {ApolloClient, InMemoryCache, gql, useQuery} from "@apollo/client";

import CountrySearch from "./CountrySearch";
import Input from "./Input";
import "../app.css";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://countries.trevorblades.com"
});

const LIST_COUNTRIES = gql`
    {
        continents {
            code
            countries {
                code
                name
                currency
                emoji
                emojiU
                languages {
                    code
                    name
                }
                continent {
                    code
                }
            }
        }
    }
`;

const Country = () => {
    const [inputContinent, setContinentCode] = useState<string>("");
    const [inputCode, setCountryCode] = useState<string>("");
    const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

    if (loading || error) {
        return <p>{error ? error.message : "Loading..."}</p>;
    }

    const country = data.continents
        .map((continent) =>
            continent.countries.find((country) => country.code === inputCode.toUpperCase())
        )
        .filter((country) => !!country)[0];

    console.log(country);
    return (
        <div className="flex">
            <div>
                <Input
                    inputCode={inputCode}
                    onInput={setCountryCode}
                    label="Country"
                    placeholder="Entry Country Code"
                />
                {country ? (
                    <CountrySearch key={country.code} country={country} />
                ) : (
                    <p>Please input country code</p>
                )}
            </div>
            <div>
                <Input
                    inputCode={inputContinent}
                    onInput={setContinentCode}
                    label="Continent"
                    placeholder="Entry Continent Code"
                />
                {inputContinent ? (
                    <>
                        <p>Countries</p>
                        <div className="continent">
                            {data.continents
                                .filter(
                                    (continent) => continent.code === inputContinent.toUpperCase()
                                )
                                .map((continent) =>
                                    continent.countries.map((country) => (
                                        <CountrySearch
                                            key={country.code}
                                            country={country}
                                            isContinent={true}
                                        />
                                    ))
                                )}
                        </div>
                    </>
                ) : (
                    <p>Please input continent code</p>
                )}
            </div>
        </div>
    );
};

export default Country;
