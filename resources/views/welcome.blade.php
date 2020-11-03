<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Zoom Meeting Dashboard</title>

        <!-- add icon link -->
        <link rel="icon" href="{{asset('images/BTR-11.png')}}" type="image/png">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>

    <body>

        <!-- React root DOM -->
        <div id="index">
        </div>

        <!-- React JS -->
        <script src="{{ asset('js/app.js') }}" defer></script>

    </body>
</html>
