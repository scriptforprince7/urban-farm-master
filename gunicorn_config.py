bind = "unix:/python/urbanfarm/ecomproj.sock"
workers = 3
chdir = "/python/urbanfarm/"
module = "ecomproj.wsgi:application"
user = "root"
group = "root"

