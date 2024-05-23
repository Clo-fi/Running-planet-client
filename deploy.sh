#!/usr/bin/env bash
#test
echo "> FE 배포"

# AWS CLI를 사용하여 S3에 업로드된 파일을 EC2로 복사합니다.
aws s3 cp s3://${{ secrets.AWS_S3_BUCKET_NAME }}/production/$GITHUB_SHA.zip /tmp/

# 복사된 파일을 원하는 위치로 이동하거나 해제합니다.
# 이 예제에서는 /var/www/html 디렉토리로 이동하였습니다.
sudo unzip -o /tmp/$GITHUB_SHA.zip -d /var/www/html

# EC2 인스턴스에 배포된 파일의 권한을 조정합니다. (예: 웹 서버가 엑세스할 수 있도록)
sudo chown -R www-data:www-data /var/www/html

# 엔진엑스 설정 파일 수정
sudo sed -i 's#root /usr/share/nginx/html;#root /var/www/html;#' /etc/nginx/nginx.conf

# 엔진엑스 재시작
sudo systemctl restart nginx
