# Generated by Django 5.1.3 on 2024-11-19 11:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_cafe_options_alter_employee_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employeecafe',
            name='start_date',
        ),
    ]