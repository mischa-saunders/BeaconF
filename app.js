const express = require('express')
const session = require('express-session')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const api = require('./api')


module.exports = function (db) {
  const app = express()

  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())

  if (app.get('env') === 'development') {
    // bundle client/index.js
    // and serve it at GET /bundle.js
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const config = require('./webpack.config')
    const webpack = require('webpack')
    const compiler = webpack(config)
    const livereload = require('livereload')
    const lrserver = livereload.createServer()

    lrserver.watch([
      __dirname + "/public",
      __dirname + "/src",
    ])

    app.use(require('inject-lr-script')())

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }))
  }

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))


  // static files
  app.use('/', express.static(path.join(__dirname, 'public')))

  // routes
  app.use('/api/v1/farms', api.farms(db))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  })


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handlers
  app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500)
      res.json({
        message: err.message,
        error: err
      })
    })
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: {}
    })
  })

  return app
}
