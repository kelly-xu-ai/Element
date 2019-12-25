pipeline {
    agent any
    options {
        parallelsAlwaysFailFast()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '8'))
    }

    stages {
        stage('npm build') {
            steps {
                nodejs('nodejs') {
                    sh 'npm install --unsafe-perm=true --allow-root'
                    sh 'npm run dist'
                }
            }
        }
        
        stage('docker build') {
            environment {
                dockerRegistry = 'img.adp-custom.cn'
                harborCred = credentials('harbor')
                imgName = "${dockerRegistry}/internal/element-${JOB_BASE_NAME}:${BUILD_NUMBER}"
            }

            steps {
                sh "docker login ${dockerRegistry} -u ${harborCred_USR} -p ${harborCred_PSW}"
                sh "docker build -t ${imgName} ."
                sh "docker push ${imgName}"
            }
        }

        stage('Deployment') {
            steps {
                sh "/usr/local/bin/helm3 upgrade --kubeconfig ${kubeConfig} -i -n $namespace internal /data/scripts/configs/element-chart --set itemName=element --set namespace=internal"
                //sh "/usr/local/bin/helm3 upgrade newsrm-front --install --host ${tillerHost} /data/scripts/configs/new-srm/front/newsrm-front-chart --set itemName=newsrm-front-${JOB_BASE_NAME} --set image.version=${BUILD_NUMBER}"
            }
        }
    }
}