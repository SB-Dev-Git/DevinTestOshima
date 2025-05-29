# AWS EC2 Terraform Project

このプロジェクトは、Terraformを使用してAWS上にEC2インスタンスを構築するためのコードを提供します。

## 前提条件

- Terraform v1.0.0以上
- AWS CLIがインストールされ、適切に設定されていること
- AWS認証情報が設定されていること

## 使用方法

1. このリポジトリをクローンします：

```bash
git clone <repository-url>
cd <repository-directory>
```

2. `variables.tf`ファイルを編集して、必要に応じて変数を設定します：

```hcl
# 例：キーペア名を設定
variable "key_name" {
  default = "your-key-pair-name"
}
```

3. Terraformを初期化します：

```bash
terraform init
```

4. 実行計画を確認します：

```bash
terraform plan
```

5. インフラストラクチャをデプロイします：

```bash
terraform apply
```

6. リソースを削除するには：

```bash
terraform destroy
```

## 作成されるリソース

- VPC
- インターネットゲートウェイ
- パブリックサブネット
- ルートテーブル
- セキュリティグループ
- EC2インスタンス

## カスタマイズ

`variables.tf`ファイルを編集することで、以下の設定をカスタマイズできます：

- AWS リージョン
- プロジェクト名
- VPC CIDR
- サブネット CIDR
- AMI ID
- インスタンスタイプ
- キーペア名
- ルートボリュームサイズ

## 出力

デプロイ後、以下の情報が出力されます：

- VPC ID
- パブリックサブネット ID
- セキュリティグループ ID
- インスタンス ID
- パブリック IP アドレス
- パブリック DNS 名
