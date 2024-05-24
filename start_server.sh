#!/bin/bash

# S3로부터 파일을 가져옵니다.
aws s3 cp s3://runple.site/index.html /var/www/html/

# Nginx를 재시작합니다.
sudo systemctl restart nginx
