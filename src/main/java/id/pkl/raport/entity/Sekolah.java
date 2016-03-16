package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="sekolah")
public class Sekolah {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Integer id;
	
	@NotBlank
	@Column(name="kode_sekolah")
	private String kodeSekolah;
	
	@NotBlank
	@Column(name="nama_sekolah")
	private String namaSekolah;
	
	@NotBlank
	@Column(name="kode_pos")
	private String kodePos;
	
	
	@ManyToOne
	@JoinColumn(name="provinsi_id", referencedColumnName="id")
	private Provinsi provinsi;
		
	@ManyToOne
	@JoinColumn(name="kabupaten_id", referencedColumnName="id")
	private Kabupaten kabupaten;
		
	@ManyToOne
	@JoinColumn(name="kecamatan_id", referencedColumnName="id")
	private Kecamatan kecamatan;
	
	@OneToOne
	@JoinColumn(name="tingkat", referencedColumnName="id")
	private Tingkatan tingkatan;
	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getKodeSekolah() {
		return kodeSekolah;
	}

	public void setKodeSekolah(String kodeSekolah) {
		this.kodeSekolah = kodeSekolah;
	}

	public String getNamaSekolah() {
		return namaSekolah;
	}

	public void setNamaSekolah(String namaSekolah) {
		this.namaSekolah = namaSekolah;
	}

	public Provinsi getProvinsi() {
		return provinsi;
	}

	public void setProvinsi(Provinsi provinsi) {
		this.provinsi = provinsi;
	}

	public Kabupaten getKabupaten() {
		return kabupaten;
	}

	public void setKabupaten(Kabupaten kabupaten) {
		this.kabupaten = kabupaten;
	}

	public Kecamatan getKecamatan() {
		return kecamatan;
	}

	public void setKecamatan(Kecamatan kecamatan) {
		this.kecamatan = kecamatan;
	}


	public String getKodePos() {
		return kodePos;
	}

	public void setKodePos(String kodePos) {
		this.kodePos = kodePos;
	}

	public Tingkatan getTingkatan() {
		return tingkatan;
	}

	public void setTingkatan(Tingkatan tingkatan) {
		this.tingkatan = tingkatan;
	}

	
	

	
	
}
