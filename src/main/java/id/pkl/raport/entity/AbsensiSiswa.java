package id.pkl.raport.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="absensi_siswa")
public class AbsensiSiswa {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="tanggal")
	private Date tanggal = new Date();
	
	@NotBlank
	@Column(name="alasan")
	private String alasan;
	
	@NotNull
	@Column(name="jenis")
	private JenisAbsensi jenisAbsensi;
	
	@ManyToOne
	@JoinColumn(name="sekolah_id", referencedColumnName="id")
	private Sekolah sekolah;
	
	@ManyToOne
	@JoinColumn(name="tahun_ajaran_id", referencedColumnName="id")
	private TahunAjaran tahunAjaran;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getTanggal() {
		return tanggal;
	}

	public void setTanggal(Date tanggal) {
		this.tanggal = tanggal;
	}

	public String getAlasan() {
		return alasan;
	}

	public void setAlasan(String alasan) {
		this.alasan = alasan;
	}

	public JenisAbsensi getJenisAbsensi() {
		return jenisAbsensi;
	}

	public void setJenisAbsensi(JenisAbsensi jenisAbsensi) {
		this.jenisAbsensi = jenisAbsensi;
	}

	public Sekolah getSekolah() {
		return sekolah;
	}

	public void setSekolah(Sekolah sekolah) {
		this.sekolah = sekolah;
	}

	public TahunAjaran getTahunAjaran() {
		return tahunAjaran;
	}

	public void setTahunAjaran(TahunAjaran tahunAjaran) {
		this.tahunAjaran = tahunAjaran;
	}	
}	
