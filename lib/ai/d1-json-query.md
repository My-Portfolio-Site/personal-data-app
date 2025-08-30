#### Read values from datatase
```
select json_extract(messages, '$') from conversations where id = 'wdawdwd';
select json_array_length(messages, '$') from conversations where id = 'wdawdwd';
```
#### Return value as json
```
select messages -> '$' from conversations where id = 'eeefff';
```
#### Insert new data
```
update conversations set messages=json_insert(messages, '$[#]', '{
    "parts": [
      {
        "type": "text",
        "text": "ok"
      }
    ],
    "id": "w26soQu1QPPdw3Yee8",
    "role": "user"
  }'
);
```

CREATE TABLE "conversations"(
  "id" TEXT NOT NULL,
  "messages" TEXT NOT NULL,
  "messages_count" AS (json_array_length(messages, '$')) STORED,
  "userId" TEXT
);


wrangler d1 execute personal-data-db --file lib/test.sql --local
wrangler d1 info personal-data-db
wrangler d1 migrations create personal-data-db test_mig
wrangler d1 export personal-data-db --local --no-data --output=migrations/001_mig_all.sql


