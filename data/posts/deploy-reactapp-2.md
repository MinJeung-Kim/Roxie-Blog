## GitHub Secrets 설정

1.  repository > `Settings` > `Secrets and variables` > `Actions` > `New repository secret`
    ![1](/images/posts/deployAWS/aws2-1.png)

> 💡 process.env.AWS_ACCESS_KEY_ID와 같이 저장되기 때문에 후에 AWS CLI에서 편하게 명령어를 입력을 위해 AWS_ACCESS_KEY_ID와 AWS_SECRET_ACCESS_KEY의 이름은 반드시 맞춰서 생성한다.
>
> ```
> // workflow 사용 예
>  - name: Deploy                  # Upload build file to S3
>      env:
>        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
>        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
> ```

![3](/images/posts/deployAWS/aws2-2.png)

## GitHub Action Workflow 생성

1. repository > `Actions` > `set up a workflow yourself` or `Simple workflow`

![4](/images/posts/deployAWS/aws2-4.png)

```yml
name: deploy # Workflow 이름
on: # Event 감지
  push:
    branches:
      - master
jobs: # Job 설정
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source code. # Repo checkout
        uses: actions/checkout@v3

      - name: Check Node v # Node v 확인
        run: node -v

      - name: Install dependencies # 의존 파일 설치
        run: npm install

      - name: Generate build # React Build
        run: npm run build

      - name: Deploy # Upload build file to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp --recursive --region ap-northeast-2 build s3://S3버킷 명
```

## CI/CD 확인
1. `push` 명령어를 사용하면 자동으로 배포된 것을 확인 할 수 있다.
![5](/images/posts/deployAWS/aws2-5.png)
![6](/images/posts/deployAWS/aws2-6.png)

## End Point URL으로 확인
![7](/images/posts/deployAWS/aws2-7.png)



참고:
https://synuns.tistory.com/75
https://mingmeng030.tistory.com/279
https://puterism.com/deploy-with-s3-and-cloudfront/
