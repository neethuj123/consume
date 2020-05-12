const jsonServer = require('json-server')

const port = 3000
const db = 'mockdb.json'

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.rewriter({
  '/consumptionService/getInitialData?token=:token': '/getInitialData?token=:token',
  '/consumptionService/downloadData': '/mock-api-response',
  '/user/login': '/userLogin',
  '/consumptionService/user/logout': '/userLogout',

})) 
router.render = function (req, res) {
  if(req.url.match('adminUserSearch') || req.url.match('scorecardTest')) {
    if (res.locals.data.length > 0) {
      res.jsonp(res.locals.data[0])
    } else {
      res.status(404).jsonp({})
    }
  } else if(req.url.match('userLogin')) {
    if(req.method === 'POST') {
      if((req.body.password === 'test') || req.body.token === 'testtoken') {
        // var response = {
        //   name: 'Test User',
        //   login: 'n3',
        //   userRole: 'CONSUMPTION_ADMIN', 
        //   token: 'qwerty'
        // }
        var response = {   
                  "login": "jain.jose", 
                  "name": "Jain Jose",
                  "email": "Jain.Jose@prestataire.altares.com",
                  "token": "7KTrHZx9Jyn1Pw3mEcfWtfne9Lo1vziZM-bM-HIrVLnfWs2e0Nri7CjLX2PzhRJkqS_Q9YOLi8PQu2ZXCY8i5whzuuzIsHQYj1uazqCWoXhZ445Ww77CADDy07-P9qay",  
                  "userRole": "CONSUMPTION_ADMIN",
                  "userId": null
              }
        response.userRole = (req.body.userName === 'test') ? 'CONSUMPTION_ADMIN' : 'INTUIZ_ADMIN';

        res.jsonp(response);
      } else {
        res.status(401).send({
        errorText: 'UnAuthorized'
      });
      }
     
    } else {
      res.jsonp(res.locals.data)
    }
  } else if(req.url.match('scorecardsCreate')) {
     if(req.method === 'POST') {
        req.body.scoreCardId = Math.floor(Math.random()*(999-100+1)+100).toString();
        res.jsonp(req.body);
     } else {
        if (res.locals.data.length === 1) {
          res.jsonp(res.locals.data[0])
        } else {
          res.jsonp(res.locals.data)
        }
     }
  } else if(req.url.match('scoreCardRestore')) {
    if(req.method === 'PUT') {
      res.jsonp({
            versionNumber: 11,
            publishedDate: '2019-01-20T11:37:56.032+0000',
            comment: 'Restore Comment from response will be added here'
          });
    } else {
      res.jsonp(res.locals.data)
    }
  }  else if(req.url.match('deleteScorecard')) {
    res.status(200).jsonp({
      success: 'Successfully deleted!!!'
    })
  } else {
    res.jsonp(res.locals.data)
  }
} 
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running at port ->', `\x1b[36m${port}\x1b[0m`)
  console.log('Mock server DB ->', `\x1b[36m${db}\x1b[0m`)
})