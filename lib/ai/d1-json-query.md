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