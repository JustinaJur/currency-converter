CREATE DATA currencies

CREATE TABLE currency(
  currency_id SERIAL PRIMARY KEY,
  currency_name VARCHAR(50) UNIQUE NOT NULL,
  currency_rate VARCHAR(15) NOT NULL
) 

CREATE TABLE currency_country(
  currency_name VARCHAR(50) REFERENCES currency(currency_name),
  country_name VARCHAR(200) NOT NULL
) 