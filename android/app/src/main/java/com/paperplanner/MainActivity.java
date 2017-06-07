package com.paperplanner;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    public static class ShareActivityDelegate extends ReactActivityDelegate {
        private static final String SHARE_ID = "share_text";
        private Bundle mInitialProps = null;
        private final Activity mActivity;

        public ShareActivityDelegate(Activity activity, String mainComponentName) {
            super(activity, mainComponentName);
            this.mActivity = activity;
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            Bundle bundle = mActivity.getIntent().getExtras();
            if (bundle != null && bundle.containsKey(SHARE_ID)) {
                mInitialProps = new Bundle();
                mInitialProps.putString(SHARE_ID, bundle.getString(SHARE_ID));
            }
            super.onCreate(savedInstanceState);
        }

        @Override
        protected Bundle getLaunchOptions() {
            return mInitialProps;
        }
    };

    @Override
    protected String getMainComponentName() {
        return "paperplanner";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ShareActivityDelegate(this, getMainComponentName());
    }
}
