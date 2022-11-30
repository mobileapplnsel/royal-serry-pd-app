package com.royalserry.PayUMoney;

import android.app.Activity;

import android.content.Intent;
import android.util.Log;

import com.google.gson.Gson;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.payumoney.core.PayUmoneyConfig;
import com.payumoney.core.PayUmoneyConstants;
import com.payumoney.core.PayUmoneySdkInitializer.PaymentParam;
import com.payumoney.core.entity.TransactionResponse;
import com.payumoney.sdkui.ui.utils.PayUmoneyFlowManager;
import com.payumoney.sdkui.ui.utils.ResultModel;
import com.royalserry.R;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;


public class AndroidPayUMoneyModule extends ReactContextBaseJavaModule implements ActivityEventListener {
  private static ReactApplicationContext reactApplicationContext;

  private String PAYU_PAYMENT_SUCCESS = "PAYU_PAYMENT_SUCCESS";
  private String PAYU_PAYMENT_FAILED = "PAYU_PAYMENT_FAILED";

  //TODO: change for production
  AppEnvironment appEnvironment = AppEnvironment.SANDBOX;
  public AndroidPayUMoneyModule(ReactApplicationContext context) {
    super(context);
    reactApplicationContext = context;
    reactApplicationContext.addActivityEventListener(this);
  }
  
  @Override
  public String getName() {
    return "AndroidPayUMoney";
  }


  @ReactMethod
  public void pay(String data) throws Exception {
    PayUmoneyConfig payUmoneyConfig = PayUmoneyConfig.getInstance();

    //Use this to set your custom text on result screen button
    payUmoneyConfig.setDoneButtonText("Complete");

    //Use this to set your custom title for the activity
    //payUmoneyConfig.setPayUmoneyActivityTitle(ActivityTitle);

    payUmoneyConfig.disableExitConfirmation(false);

    PayumoneyModal payuData = new Gson().fromJson(data, PayumoneyModal.class);

    Log.e("TingTong",data);
    Log.e("TingTongtxnId",payuData.txnId);
    PaymentParam.Builder builder = new PaymentParam.Builder();

    builder.setAmount(payuData.amount)
            .setKey(appEnvironment.merchant_Key())
            .setMerchantId(appEnvironment.merchant_ID())
            .setTxnId(payuData.txnId)
            .setPhone(payuData.phone)
            .setProductName(payuData.productName)
            .setFirstName(payuData.firstName)
            .setEmail(payuData.email)
            .setsUrl(appEnvironment.surl())
            .setfUrl(appEnvironment.furl())
            .setIsDebug(appEnvironment.debug())
            .setUdf1(payuData.udf1)
            .setUdf2(payuData.udf2)
            .setUdf3(payuData.udf3)
            .setUdf4(payuData.udf4)
            .setUdf5(payuData.udf5)
            .setUdf6(payuData.udf6)
            .setUdf7(payuData.udf7)
            .setUdf8(payuData.udf8)
            .setUdf9(payuData.udf9)
            .setUdf10(payuData.udf10);

    PaymentParam paymentParam = builder.build();
    paymentParam.setMerchantHash(calculateServerSideHashAndInitiatePayment(paymentParam));
    dispatchInAppropriateThread(new Runnable() {
      @Override
      public void run() {
        PayUmoneyFlowManager.startPayUMoneyFlow(paymentParam, reactApplicationContext.getCurrentActivity(), R.style.AppTheme_default, true);
      }
    });
  }



  private void sendEvent(String eventName, String params ) {
    reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }
  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    if (requestCode == PayUmoneyFlowManager.REQUEST_CODE_PAYMENT && resultCode == Activity.RESULT_OK && data != null) {
      TransactionResponse transactionResponse = data.getParcelableExtra(PayUmoneyFlowManager.INTENT_EXTRA_TRANSACTION_RESPONSE);
      if (transactionResponse != null && transactionResponse.getPayuResponse() != null) {
        String payuResponse  = transactionResponse.getPayuResponse();
        if (transactionResponse.getTransactionStatus().equals(TransactionResponse.TransactionStatus.SUCCESSFUL)) {
          sendEvent(PAYU_PAYMENT_SUCCESS, "{\"response\":"+payuResponse+"}");
        } else {
          sendEvent(PAYU_PAYMENT_FAILED, "{\"success\":false}");
        }
      } else {
        sendEvent(PAYU_PAYMENT_FAILED, "{\"success\":false}");
      }
    }
    else {
      //back button or else
      sendEvent(PAYU_PAYMENT_FAILED, "{\"success\":false}");
    }
  }

  @Override
  public void onNewIntent(Intent intent) {

  }


  protected void dispatchInAppropriateThread(Runnable runnable) {
    if (runnable == null) {
      return;
    }
    reactApplicationContext.runOnUiQueueThread(runnable);
  }

  private String calculateServerSideHashAndInitiatePayment(final PaymentParam paymentParam) {

    StringBuilder stringBuilder = new StringBuilder();
    HashMap<String, String> params = paymentParam.getParams();
    stringBuilder.append(params.get(PayUmoneyConstants.KEY) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.TXNID) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.AMOUNT) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.PRODUCT_INFO) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.FIRSTNAME) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.EMAIL) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.UDF1) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.UDF2) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.UDF3) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.UDF4) + "|");
    stringBuilder.append(params.get(PayUmoneyConstants.UDF5) + "||||||");


    stringBuilder.append(appEnvironment.salt());

    String hash = hashCal(stringBuilder.toString());


    return hash;
  }

  private static String hashCal(String str) {
    byte[] hashseq = str.getBytes();
    StringBuilder hexString = new StringBuilder();
    try {
      MessageDigest algorithm = MessageDigest.getInstance("SHA-512");
      algorithm.reset();
      algorithm.update(hashseq);
      byte messageDigest[] = algorithm.digest();
      for (byte aMessageDigest : messageDigest) {
        String hex = Integer.toHexString(0xFF & aMessageDigest);
        if (hex.length() == 1) {
          hexString.append("0");
        }
        hexString.append(hex);
      }
    } catch (NoSuchAlgorithmException ignored) {
    }
    return hexString.toString();
  }

  public enum AppEnvironment {

    SANDBOX {
      @Override
      public String merchant_Key() {
        return "T1zepEY4";
      }

      @Override
      public String merchant_ID() {
        return "7188004";
      }

      @Override
      public String furl() {
        return "https://www.payumoney.com/mobileapp/payumoney/failure.php";
      }

      @Override
      public String surl() {
        return "https://www.payumoney.com/mobileapp/payumoney/success.php";
      }

      @Override
      public String salt() {
        return "2MnqbRWlrX";
      }

      @Override
      public boolean debug() {
        return true;
      }
    },
    PRODUCTION {
      @Override
      public String merchant_Key() {
        return "T1zepEY4";
      }
      @Override
      public String merchant_ID() {
        return "7188004";
      }
      @Override
      public String furl() {
        return "https://secure.payu.in/_payment";
      }

      @Override
      public String surl() {
        return "https://secure.payu.in/_payment";
      }

      @Override
      public String salt() {
        return "2MnqbRWlrX";
      }

      @Override
      public boolean debug() {
        return false;
      }
    };

    public abstract String merchant_Key();

    public abstract String merchant_ID();

    public abstract String furl();

    public abstract String surl();

    public abstract String salt();

    public abstract boolean debug();


  }
}