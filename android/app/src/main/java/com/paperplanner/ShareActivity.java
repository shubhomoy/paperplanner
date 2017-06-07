package com.paperplanner;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

public class ShareActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_share);

        Intent intent = getIntent();
        String action = intent.getAction();
        String type = intent.getType();

        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if ("text/plain".equals(type)) {
                String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
                if (sharedText != null) {
                    String packageName = getApplicationContext().getPackageName();
                    Intent launchIntent = getPackageManager().getLaunchIntentForPackage(packageName);
                    launchIntent.putExtra("share_text", sharedText);
                    startActivity(launchIntent);
                    finish();
                }
            }else{
                finish();
            }
        } else {
            finish();
        }
    }
}
