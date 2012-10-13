load 'application'

before 'load scheme', ->
    Scheme.find params.id, (err, scheme) =>
        if err
            redirect path_to.schemes()
        else
            @scheme = scheme
            next()
, only: ['show', 'edit', 'update', 'destroy']

action 'new', ->
    @scheme = new Scheme
    @title = 'New scheme'
    render()

action 'create', ->
    Scheme.create body.Scheme, (err, scheme) =>
        if err
            flash 'error', 'Scheme can not be created'
            @scheme = scheme
            @title = 'New scheme'
            render 'new'
        else
            flash 'info', 'Scheme created'
            redirect path_to.schemes()

action 'index', ->
    Scheme.all (err, schemes) =>
        @schemes = schemes
        @title = 'Schemes index'
        render()

action 'show', ->
    @title = 'Scheme show'
    render()

action 'edit', ->
    @title = 'Scheme edit'
    render()

action 'update', ->
    @scheme.updateAttributes body.Scheme, (err) =>
        if !err
            flash 'info', 'Scheme updated'
            redirect path_to.scheme(@scheme)
        else
            flash 'error', 'Scheme can not be updated'
            @title = 'Edit scheme details'
            render 'edit'

action 'destroy', ->
    @scheme.destroy (error) ->
        if error
            flash 'error', 'Can not destroy scheme'
        else
            flash 'info', 'Scheme successfully removed'
        send "'" + path_to.schemes() + "'"

