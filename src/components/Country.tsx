import React, {useState} from "react";
import {ApolloClient, InMemoryCache, gql, useQuery} from "@apollo/client";

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
                <input
                    placeholder="Enter Country Code"
                    onChange={(e) => setCountryCode(e.target.value)}
                    type="text"
                    value={inputCode}
                />
                {country ? (
                    <div key={country.code}>
                        <p className="countryRow" style={{marginTop: "10px"}}>
                            Name: {country.name}
                        </p>
                        <p className="countryRow">Code: {country.code}</p>
                        <p className="countryRow">Currency: {country.currency}</p>
                        <p className="countryRow">
                            Flag: <span>{country.emoji}</span>
                        </p>
                        <p className="countryRow">
                            Languages:
                            {country.languages.map((language) => (
                                <span key={language.name}> {language.name}</span>
                            ))}
                        </p>
                    </div>
                ) : (
                    <p>Please input country code</p>
                )}
            </div>
            <div>
                <input
                    placeholder="Enter Continent Code"
                    onChange={(e) => setContinentCode(e.target.value)}
                    type="text"
                    value={inputContinent}
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
                                        <div key={country.code} className="countryRow">
                                            <span>{country.emoji}</span>
                                            <span>{country.name}</span>
                                        </div>
                                    ))
                                )}
                        </div>
                    </>
                ) : (
                    <p>Please input continent</p>
                )}
            </div>
        </div>
    );
};

export default Country;
