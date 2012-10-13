define 'User', ->
    property 'email', String, index: true
    property 'password', String
    property 'activated', Boolean, default: false

Scheme = describe 'Scheme', () ->
    property 'name', String
    property 'url', String
