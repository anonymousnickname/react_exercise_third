import React from "react";

type countryObject = {
    name: string;
    code: string;
    currency: string;
    emoji: string;
    emojiU: string;
    languages: Array<{
        name: string;
    }>;
};

type CountrySearchProps = {
    country: countryObject;
    isContinent?: boolean;
};

const CountrySearch = ({country, isContinent = false}: CountrySearchProps) => {
    if (isContinent) {
        return (
            <div className="countryRow">
                <span>{country.emoji}</span>
                <span>{country.name}</span>
            </div>
        );
    }
    return (
        <div>
            <p className="countryRow" style={{marginTop: "10px"}}>
                Name: <span> {country.name}</span>
            </p>
            <p className="countryRow">
                Code: <span>{country.code}</span>
            </p>
            <p className="countryRow">
                Currency: <span>{country.currency}</span>{" "}
            </p>
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
    );
};

export default CountrySearch;
