#lab4
1. please install mpm i 
2. strat endback please run : npn start 
3. please open frontend click index. and open with live serve 

maybe have Access-Control-Allow-Origin issue , error message :Access to XMLHttpRequest at 'http://localhost:5000/users/' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://127.0.0.1:5501' that is not equal to the supplied origin.

please change server :res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
change http://127.0.0.1:5500 same as front page (sorry I didn't fix this issue )

Thanks 