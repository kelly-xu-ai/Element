pipeline {
    agent any
    options {
        parallelsAlwaysFailFast()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }

    parameters { string(name: 'TAG_NAME', defaultValue: '', description: 'tag name') }

    stages {
        stage('npm install') {
            steps {
                nodejs('nodejs') {
                    sh 'npm install --unsafe-perm=true --alow-root'
                }
            }
        }

        stage('npm dist and demo') {
            parallel {
                stage ('dist') {
                    steps {
                        nodejs('nodejs') {
                            sh 'npm run deploy:build'
                        }
                    }
                }

                stage ('demo') {
                    steps {
                        nodejs('nodejs') {
                            sh 'npm run dist'
                        }
                    }
                }
            }
        }
        
        stage('deliver') {
            environment {
                dockerRegistry = 'img.adp-custom.cn'
                harborCred = credentials('harbor')
                imgName = "${dockerRegistry}/internal/${JOB_BASE_NAME}:${BUILD_NUMBER}"
            }

            parallel {
                stage('push lib') {
                    steps {
                        sh "git add lib && git commit -m ${TAG_NAME} || true && git push origin HEAD:refs/heads/master && git tag ${TAG_NAME} && git push origin ${TAG_NAME}"
                    }
                }

                stage('docker build') {
                    steps {
                        sh "docker login ${dockerRegistry} -u ${harborCred_USR} -p ${harborCred_PSW}"
                        sh "docker build -t ${imgName} ."
                        sh "docker push ${imgName}"
                    }
                }
            }
        }

        stage('Deployment') {
            steps {
                //sh "/usr/local/bin/helm3 upgrade --kubeconfig /root/.kube/config -i -n internal /data/scripts/configs/element-chart --set itemName=element --set namespace=internal"
                sh "/usr/local/bin/helm3 upgrade element --kubeconfig /root/.kube/config -i -n internal /data/scripts/configs/element-chart --set itemName=element --set namespace=internal --set image.version=${BUILD_NUMBER}"
            }
        }
    }
}