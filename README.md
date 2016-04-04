### Build app TODO with Resful Api use express and client side use flux react

![nodejs + express + flux + mongodb ](https://cloud.githubusercontent.com/assets/5398914/14241860/f4f956dc-fa88-11e5-86a5-b0470321e214.jpg)

### Demo
![demo app](https://cloud.githubusercontent.com/assets/5398914/14241931/5b5622de-fa89-11e5-9978-644bf2496dcb.png)

### API architecture

| End point         | Method  | Data                        | Mean             |
|:------------------|--------:|:---------------------------:|:----------------:|
| /api/todo/        |  GET    |                             | Get list todo    |
| /api/todo/create  |  POST   | {"text": "test"}            |    Create a todo |
| /api/todo/archive |  GET    |                             | Archive all todo completed
| /api/todo/update  |  POST   |  {"id": "56ff521f5edc574e072e6c46", "complete": 1, "text": "test"}                                                     |  Update a todo   | 
| /api/todo/destroy |  DELETE   |  {"id": "56ff521f5edc574e072e6c46"} |  Delete a todo   | 


### Data returned from api

```javascript
$ curl http://localhost:5000/api/todo/

{  
   "status":"ok",
   "result":[  
      {  
         "_id":"570216599de7320e5c43457c",
         "text":"thang hahaha",
         "__v":0,
         "modified":"2016-04-04T06:58:40.994Z",
         "created":"2016-04-04T06:58:40.993Z",
         "complete":0
      },
      {  
         "_id":"5702168b9de7320e5c43457f",
         "text":"ee ddd",
         "__v":0,
         "modified":"2016-04-04T06:58:40.994Z",
         "created":"2016-04-04T06:58:40.993Z",
         "complete":0
      },
      {  
         "_id":"57021ad99de7320e5c434589",
         "text":"hahaha",
         "__v":0,
         "modified":"2016-04-04T06:58:40.994Z",
         "created":"2016-04-04T06:58:40.993Z",
         "complete":0
      }
   ]
}
```

```javascript
$ curl http://localhost:5000/api/todo/create -X POST -H "Content-Type: application/json" -d '{"text": "abc"}'

{  
   "status":"ok",
   "result":{  
      "__v":0,
      "text":"abc",
      "_id":"57021fe79de7320e5c43458b",
      "modified":"2016-04-04T06:58:40.994Z",
      "created":"2016-04-04T06:58:40.993Z",
      "complete":0
   }
}
```

```json
$ curl http://localhost:5000/api/todo/update -X POST -H "Content-Type: application/json" -d '{"id": "570216599de7320e5c43457c", "complete": 1, "text": "test"}'

{  
   "status":"ok",
   "result":{  
      "id":"570216599de7320e5c43457c",
      "text":"test",
      "complete":1
   }
}
```

```json
$ curl http://localhost:5000/api/todo/archive

{"status":"ok"}
```

```json
$ curl http://localhost:5000/api/todo/destroy -X DELETE -H "Content-Type: application/json" -d '{"id": "56ff521f5edc574e072e6c46"}'

{"status":"ok"}
```

#### The references
React Todo Example: https://github.com/thangnv107/react-example

Flux + React Todo Example: https://github.com/thangnv107/flux-react-example

A example about express + nodejs + mongodb: https://github.com/thangnv107/express-example

