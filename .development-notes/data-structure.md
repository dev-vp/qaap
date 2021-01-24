# Data Structure

**Base Structure**

* Obsolete (GET `/api/session/:sessionKey`):

```json
{
  "title": "test poll",
  "chartType": "bar",
  "question": "Test",
  "option1": "option1",
  "vote1": 0,
  "option2": "option2",
  "vote2": 8,
  "option3": "option3",
  "vote3": 5,
  "option4": null,
  "vote4": 0,
  "option5": null,
  "vote5": 0,
  "pollSession": {
    "id": 1,
    "sessionId": "202107291830"
  }
}
```

* Improved (GET `/api/session/:sessionKey`):

```json
[
  {
    "id": 4,
    "title": "Poll #4",
    "chartType": "bar",
    "question": "What is 4?",
    "createdAt": "2021-01-23T18:47:49.219Z",
    "updatedAt": "2021-01-23T18:47:49.219Z",
    "options": [
      {
        "id": 9,
        "option": "Opt #1",
        "createdAt": "2021-01-23T18:47:49.233Z",
        "updatedAt": "2021-01-23T18:47:49.233Z",
        "pollId": 4,
        "vote": {
          "id": 4,
          "vote": 8,
          "createdAt": "2021-01-23T18:47:49.249Z",
          "updatedAt": "2021-01-23T18:47:49.249Z",
          "pollId": 4,
          "optionId": 9
        }
      },
      {
        "id": 10,
        "option": "Opt #2",
        "createdAt": "2021-01-23T18:47:49.233Z",
        "updatedAt": "2021-01-23T18:47:49.233Z",
        "pollId": 4,
        "vote": {
          "id": 5,
          "vote": 1,
          "createdAt": "2021-01-23T18:47:49.249Z",
          "updatedAt": "2021-01-23T18:47:49.249Z",
          "pollId": 4,
          "optionId": 10
        }
      }
    ]
  }
]
```

### Magic Methods

**POLL**

* \_isAttribute: [Function],
* getSessionkey: [Function],
* setSessionkey: [Function],
* createSessionkey: [Function],
* getOptions: [Function],
* countOptions: [Function],
* hasOption: [Function],
* hasOptions: [Function],
* setOptions: [Function],
* addOption: [Function],
* addOptions: [Function],
* removeOption: [Function],
* removeOptions: [Function],
* createOption: [Function],
* getVotes: [Function],
* countVotes: [Function],
* hasVote: [Function],
* hasVotes: [Function],
* setVotes: [Function],
* addVote: [Function],
* addVotes: [Function],
* removeVote: [Function],
* removeVotes: [Function],
* createVote: [Function]

**OPTION**

* \_isAttribute: [Function],
* getPoll: [Function],
* setPoll: [Function],
* createPoll: [Function],
* getVote: [Function],
* setVote: [Function],
* createVote: [Function]

**VOTE**

* \_isAttribute: [Function],
* getPoll: [Function],
* setPoll: [Function],
* createPoll: [Function]
